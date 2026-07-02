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
        'relative inline-flex items-center justify-center gap-2 font-semibold rounded-lg',
        'transition-all duration-200 select-none cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:opacity-50 disabled:pointer-events-none',
        'active:scale-[0.97]',

        // Variants
        variant === 'default' && [
          'bg-primary text-white',
          'hover:bg-primary-hover shadow-primary-sm hover:shadow-primary-md',
        ],
        variant === 'secondary' && [
          'bg-secondary text-white',
          'hover:bg-secondary-hover shadow-sm hover:shadow-md',
        ],
        variant === 'accent' && [
          'bg-accent text-white',
          'hover:bg-accent-hover shadow-sm hover:shadow-md',
        ],
        variant === 'outline' && [
          'border border-border bg-transparent text-foreground',
          'hover:bg-surface hover:border-primary/40 hover:text-primary',
        ],
        variant === 'ghost' && [
          'bg-transparent text-foreground-muted',
          'hover:bg-surface hover:text-foreground',
        ],
        variant === 'danger' && [
          'bg-error text-white',
          'hover:bg-error/85 shadow-sm',
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