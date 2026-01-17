/**
 * Shared TypeScript Types
 * Per Constitution v1.0.0 - Principle V: Type Safety & Code Quality
 */

// Component Props
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Section Props
export interface SectionProps extends BaseProps {
  id?: string;
}

// Button Variants
export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Animation Types
export interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  ease?: string;
}

export interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

// Product Types (for future use)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  roastLevel: 'light' | 'medium' | 'dark';
  origin: string;
}
