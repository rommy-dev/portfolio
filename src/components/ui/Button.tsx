import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        // Base
        'relative inline-flex items-center justify-center gap-2 font-semibold rounded-[2px] border',
        'transition-all duration-200 select-none cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--editorial-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--editorial-bg))]',
        'disabled:opacity-50 disabled:pointer-events-none',
        'active:scale-[0.97]',

        // Variants
        variant === 'default' && [
          'border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-primary))] text-[hsl(var(--editorial-primary-fg))]',
          'hover:bg-[hsl(var(--editorial-primary-strong))]',
        ],
        variant === 'secondary' && [
          'border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-surface-strong))] text-[hsl(var(--editorial-foreground))]',
          'hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]',
        ],
        variant === 'accent' && [
          'border-[hsl(var(--editorial-border))] bg-[hsl(var(--editorial-primary))] text-[hsl(var(--editorial-primary-fg))]',
          'hover:bg-[hsl(var(--editorial-primary-strong))]',
        ],
        variant === 'outline' && [
          'border-[hsl(var(--editorial-border))] bg-transparent text-[hsl(var(--editorial-foreground))]',
          'hover:border-[hsl(var(--editorial-primary))] hover:text-[hsl(var(--editorial-primary))]',
        ],
        variant === 'ghost' && [
          'border-transparent bg-transparent text-[hsl(var(--editorial-foreground-muted))]',
          'hover:bg-[hsl(var(--editorial-surface))] hover:text-[hsl(var(--editorial-foreground))]',
        ],
        variant === 'danger' && [
          'border-[hsl(var(--error))] bg-[hsl(var(--error))] text-white',
          'hover:bg-[hsl(var(--error))]/85',
        ],

        // Sizes
        size === 'sm'   && 'h-8 px-3 text-xs',
        size === 'md'   && 'h-10 px-4 text-sm',
        size === 'lg' && 'h-10 md:h-12 px-4 md:px-6 text-sm md:text-base',
        size === 'icon' && 'h-9 w-9 p-0',

        className
      )}
      {...props}
    >
      {/* Loading spinner replaces left icon */}
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
      ) : (
        iconLeft && <span className="shrink-0">{iconLeft}</span>
      )}

      {/* Label (hidden during loading if icon-only) */}
      {children && (
        <span className={cn(loading && 'opacity-70')}>{children}</span>
      )}

      {/* Right icon — hidden when loading */}
      {!loading && iconRight && (
        <span className="shrink-0">{iconRight}</span>
      )}
    </button>
  );
}