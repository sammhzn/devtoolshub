/**
 * DevToolsHub Design System Template
 * ================================
 * 
 * This file contains ALL design tokens and constants for the site.
 * Edit this file to change the entire site's look and feel.
 * Remove this file and its imports to revert to default styles.
 * 
 * Color Palette, Typography, Spacing, Component Styles, and more.
 */

// ============================================
// COLOR PALETTE
// ============================================
export const colors = {
  background: {
    primary: '#0A0E27',    // Very dark navy (deepest background)
    secondary: '#0F172A',  // Slightly lighter (header, footer)
    card: '#1A1F3A',       // Cards, inputs, elevated surfaces
  },
  accent: {
    primary: '#00D9FF',    // Bright cyan (buttons, highlights, links)
    secondary: '#A78BFA',  // Purple (subtle highlights, category names)
  },
  text: {
    primary: '#F1F5F9',    // Off-white (headings, body text)
    secondary: '#94A3B8',  // Muted gray (descriptions, meta)
    muted: '#666666',      // Very muted (placeholders, tertiary info)
  },
  border: '#334155',       // Dark gray (borders, dividers)
  success: '#10B981',      // Green (confirmations, toasts)
  error: '#EF4444',        // Red (errors, destructive)
} as const;

// Shorthand aliases for Tailwind usage
export const bg = colors.background;
export const accent = colors.accent;
export const text = colors.text;

// ============================================
// TYPOGRAPHY
// ============================================
export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans), Inter, system-ui, sans-serif',
    mono: 'var(--font-geist-mono), Monaco, Fira Code, monospace',
  },
  headline: {
    size: {
      h1: { desktop: '48px', tablet: '36px', mobile: '28px' },
      h2: { desktop: '28px', tablet: '24px', mobile: '22px' },
      h3: { desktop: '24px', tablet: '20px', mobile: '18px' },
    },
    weight: '700' as const,
  },
  subheading: {
    size: { desktop: '18px', tablet: '16px', mobile: '16px' },
    weight: '600' as const,
  },
  body: {
    size: { desktop: '16px', tablet: '15px', mobile: '14px' },
    weight: '400' as const,
    lineHeight: '1.6',
  },
  code: {
    size: { desktop: '14px', tablet: '13px', mobile: '13px' },
    weight: '400' as const,
  },
  button: {
    size: { desktop: '16px', mobile: '14px' },
    weight: '700' as const,
  },
  small: {
    size: '12px',
    weight: '400' as const,
  },
} as const;

// ============================================
// SPACING (8px grid)
// ============================================
export const spacing = {
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '48px',
  6: '64px',
} as const;

// ============================================
// BORDER RADIUS
// ============================================
export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
} as const;

// ============================================
// TRANSITIONS & ANIMATIONS
// ============================================
export const transitions = {
  fast: '0.1s ease',
  normal: '0.2s ease',
  smooth: '0.3s ease',
  pageFadeIn: 'opacity 0.3s ease',
} as const;

export const animations = {
  hoverLift: `transform 0.3s ease, box-shadow 0.3s ease`,
  buttonPress: `transform 0.1s ease`,
  glowPulse: `box-shadow 0.3s ease`,
} as const;

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  cardHover: `0 0 20px rgba(0, 217, 255, 0.3)`,
  buttonHover: `0 0 20px rgba(0, 217, 255, 0.6)`,
  buttonActive: `0 0 10px rgba(0, 217, 255, 0.4)`,
  focusRing: `0 0 0 2px rgba(0, 217, 255, 0.5)`,
  inputFocus: `0 0 0 1px ${colors.accent.primary}, 0 0 15px rgba(0, 217, 255, 0.15)`,
} as const;

// ============================================
// COMPONENT STYLES
// ============================================

/** Primary cyan button */
export const buttonPrimary = {
  background: colors.accent.primary,
  color: colors.background.primary,
  border: 'none',
  padding: '10px 16px',
  borderRadius: radius.sm,
  fontWeight: typography.button.weight,
  fontSize: typography.button.size.desktop,
  hover: {
    boxShadow: shadows.buttonHover,
    transform: 'scale(1.02)',
  },
  active: {
    transform: 'scale(0.98)',
  },
  transition: transitions.normal,
} as const;

/** Secondary/outline button with cyan border */
export const buttonSecondary = {
  background: colors.background.card,
  color: colors.accent.primary,
  border: `1px solid ${colors.accent.primary}`,
  padding: '10px 16px',
  borderRadius: radius.sm,
  fontWeight: typography.button.weight,
  fontSize: typography.button.size.desktop,
  hover: {
    background: 'rgba(0, 217, 255, 0.1)',
  },
  active: {
    transform: 'scale(0.98)',
  },
  transition: transitions.normal,
} as const;

/** Ghost/outline button */
export const buttonOutline = {
  background: 'transparent',
  color: colors.text.secondary,
  border: `1px solid ${colors.border}`,
  padding: '10px 16px',
  borderRadius: radius.sm,
  fontWeight: typography.button.weight,
  fontSize: typography.button.size.desktop,
  hover: {
    borderColor: colors.accent.primary,
    color: colors.text.primary,
  },
  active: {
    transform: 'scale(0.98)',
  },
  transition: transitions.normal,
} as const;

/** CTA Hero button (larger) */
export const buttonCTA = {
  background: colors.accent.primary,
  color: colors.background.primary,
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: '700',
  fontSize: '16px',
  hover: {
    boxShadow: shadows.buttonHover,
    transform: 'scale(1.02)',
  },
  active: {
    transform: 'scale(0.98)',
  },
  transition: transitions.normal,
} as const;

/** Secondary CTA (bordered) */
export const buttonCTASecondary = {
  background: 'transparent',
  color: colors.accent.primary,
  border: `1px solid ${colors.accent.primary}`,
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '16px',
  hover: {
    background: 'rgba(0, 217, 255, 0.1)',
  },
  active: {
    transform: 'scale(0.98)',
  },
  transition: transitions.normal,
} as const;

/** Standard textarea/input */
export const inputStyle = {
  background: colors.background.card,
  color: colors.text.primary,
  border: `1px solid ${colors.border}`,
  padding: '16px',
  borderRadius: radius.md,
  fontFamily: typography.fontFamily.mono,
  fontSize: typography.code.size.desktop,
  placeholder: colors.text.muted,
  minHeight: '400px',
  focus: {
    borderColor: colors.accent.primary,
    boxShadow: shadows.inputFocus,
    outline: 'none',
  },
  transition: transitions.normal,
} as const;

/** Tool card */
export const cardStyle = {
  background: colors.background.card,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.lg,
  padding: spacing[3],
  hover: {
    transform: 'translateY(-4px)',
    boxShadow: shadows.cardHover,
    borderColor: colors.accent.primary,
  },
  transition: transitions.smooth,
} as const;

/** Blog post card */
export const blogCardStyle = {
  background: colors.background.card,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  padding: spacing[2],
  hover: {
    transform: 'translateY(-4px)',
    boxShadow: shadows.cardHover,
  },
  transition: transitions.smooth,
} as const;

// ============================================
// LAYOUT
// ============================================
export const layout = {
  maxWidth: '1280px',
  header: {
    height: '64px',
    background: colors.background.secondary,
    borderBottom: `1px solid ${colors.border}`,
    sticky: true,
  },
  footer: {
    background: colors.background.secondary,
    borderTop: `1px solid ${colors.border}`,
  },
  hero: {
    padding: { desktop: '80px 0', mobile: '48px 0' },
    background: `linear-gradient(135deg, ${colors.background.primary} 0%, ${colors.background.secondary} 50%, ${colors.background.primary} 100%)`,
  },
  section: {
    padding: { desktop: '64px 0', mobile: '48px 0' },
  },
} as const;

// ============================================
// RESPONSIVE BREAKPOINTS
// ============================================
export const breakpoints = {
  mobile: '767px',
  tablet: '768px',
  desktop: '1200px',
} as const;

// ============================================
// TOAST / NOTIFICATION
// ============================================
export const toast = {
  success: {
    background: colors.success,
    color: '#FFFFFF',
    duration: 2000,
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: colors.error,
    borderColor: colors.error,
  },
  info: {
    background: colors.background.card,
    color: colors.text.primary,
    borderColor: colors.border,
  },
} as const;

// ============================================
// CODE BLOCKS
// ============================================
export const codeBlock = {
  background: colors.background.secondary,
  border: `1px solid ${colors.border}`,
  color: colors.text.primary,
  padding: spacing[2],
  borderRadius: radius.sm,
  fontFamily: typography.fontFamily.mono,
  fontSize: typography.code.size.desktop,
  lineHeight: '1.5',
} as const;

// ============================================
// TAILWIND THEME EXTENSION
// (For use in tailwind.config or @theme)
// ============================================
export const tailwindTheme = {
  colors: {
    'dev-bg': colors.background.primary,
    'dev-bg-alt': colors.background.secondary,
    'dev-card': colors.background.card,
    'dev-cyan': colors.accent.primary,
    'dev-purple': colors.accent.secondary,
    'dev-text': colors.text.primary,
    'dev-text-muted': colors.text.secondary,
    'dev-text-dim': colors.text.muted,
    'dev-border': colors.border,
    'dev-success': colors.success,
    'dev-error': colors.error,
  },
} as const;

// ============================================
// ACCESSIBILITY
// ============================================
export const a11y = {
  minTouchTarget: '44px',
  focusRing: `2px solid ${colors.accent.primary}`,
  focusOffset: '2px',
} as const;

// ============================================
// SEO DEFAULTS
// ============================================
export const seo = {
  siteName: 'DevToolsHub',
  siteUrl: 'https://devtoolshub.tk',
  homeTitle: 'DevToolsHub - 50+ Free Developer Tools Online',
  homeDescription: 'Free online developer tools including JSON formatter, Base64 encoder, hash generator, and more. No sign-up required.',
  ogImage: 'https://devtoolshub.tk/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  toolTitleTemplate: '{toolName} - Free Online DevToolsHub',
  toolDescTemplate: '{description}. Instant, no sign-up required.',
  blogTitleTemplate: '{title} | DevToolsHub Blog',
} as const;
