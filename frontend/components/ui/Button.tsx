'use client';

/**
 * Button Component
 * Reusable CTA button with brand styling
 * Per Constitution v1.0.0 - Principle III: Luxury Brand Standards
 */

import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled = false,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed rounded-lg',

        // Variant styles
        variant === 'primary' &&
          'bg-[#C89B3C] text-[#F5EFE6] hover:scale-105 focus-visible:ring-[#C89B3C]',
        variant === 'secondary' &&
          'border-2 border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C]/10 focus-visible:ring-[#C89B3C]',
        variant === 'text' &&
          'text-[#C89B3C] hover:underline underline-offset-4',

        // Size styles
        size === 'sm' && 'px-6 py-2 text-base',
        size === 'md' && 'px-8 py-3 text-lg',
        size === 'lg' && 'px-10 py-4 text-xl',

        className
      )}
    >
      {children}
    </button>
  );
}
