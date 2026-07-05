/**
 * rate-limit.ts — Rate limiter in-memory pour les routes API.
 *
 * Stratégie : sliding window avec tableau de timestamps par IP.
 * - 3 requêtes max par IP par fenêtre de 1 heure
 * - Nettoyage lazy des entrées expirées à chaque appel
 * - Compatible Vercel Serverless (chaque instance a sa propre Map)
 *
 * Note : En serverless, chaque cold start crée une nouvelle Map.
 * C'est suffisant pour un portfolio (faible trafic), mais pour du
 * trafic élevé, migrer vers Upstash Redis (rate-limit distribué).
 */

/** Configuration du rate limiter */
const WINDOW_MS = 60 * 60 * 1000; // 1 heure en millisecondes
const MAX_REQUESTS = 3;

/** Stockage en mémoire : IP → tableau de timestamps (epoch ms) */
const requestLog = new Map<string, number[]>();

/** Résultat d'une vérification de rate limit */
interface RateLimitResult {
  /** true si la requête est autorisée */
  allowed: boolean;
  /** Nombre de requêtes restantes dans la fenêtre */
  remaining: number;
  /** Secondes avant la prochaine fenêtre (uniquement si bloqué) */
  retryAfter?: number;
}

/**
 * Vérifie si une IP a dépassé la limite de requêtes.
 * Nettoyage automatique des timestamps expirés.
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Récupérer les timestamps existants et filtrer les expirés
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS) {
    // Bloqué : calculer le temps d'attente avant la prochaine fenêtre
    const oldestInWindow = timestamps[0]!;
    const retryAfterMs = oldestInWindow + WINDOW_MS - now;
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);

    // Mettre à jour avec les timestamps nettoyés (sans en ajouter)
    requestLog.set(ip, timestamps);

    return {
      allowed: false,
      remaining: 0,
      retryAfter: retryAfterSec,
    };
  }

  // Autorisé : enregistrer cette requête
  timestamps.push(now);
  requestLog.set(ip, timestamps);

  // GC lazy : nettoyer les IPs dont tous les timestamps ont expiré
  // (exécuté rarement pour éviter un overhead inutile)
  if (Math.random() < 0.1) {
    for (const [key, times] of requestLog.entries()) {
      const activeTimes = times.filter((t) => t > windowStart);
      if (activeTimes.length === 0) {
        requestLog.delete(key);
      }
    }
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - timestamps.length,
  };
}

/**
 * Extrait l'adresse IP du client depuis les headers de la requête.
 * Prend en compte le proxy Vercel (x-forwarded-for).
 */
export function getClientIp(headers: Headers): string {
  // x-forwarded-for peut contenir plusieurs IPs : "client, proxy1, proxy2"
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  // Fallback pour le dev local
  return headers.get('x-real-ip') ?? '127.0.0.1';
}
