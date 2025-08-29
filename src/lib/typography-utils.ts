// Typography utility classes
export const typography = {
  // Headings
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight',
  h4: 'text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight',
  h5: 'text-lg md:text-xl lg:text-2xl font-semibold tracking-tight',
  h6: 'text-base md:text-lg lg:text-xl font-semibold tracking-tight',
  
  // Body text
  body: 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  'body-lg': 'text-lg leading-relaxed',
  
  // Special text
  lead: 'text-lg md:text-xl leading-relaxed font-light',
  subtitle: 'text-lg md:text-xl font-medium',
  caption: 'text-sm font-medium',
  overline: 'text-xs font-semibold uppercase tracking-wider',
  
  // Code
  code: 'font-mono text-sm bg-slate-800 px-2 py-1 rounded',
  'code-block': 'font-mono text-sm bg-slate-800 p-4 rounded-lg overflow-x-auto',
} as const

// Text colors
export const textColors = {
  primary: 'text-cyan-400',
  secondary: 'text-slate-300',
  muted: 'text-slate-400',
  accent: 'text-purple-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
  white: 'text-white',
  gradient: 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent',
} as const

export type TypographyVariant = keyof typeof typography
export type TextColor = keyof typeof textColors
