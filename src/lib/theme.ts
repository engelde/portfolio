import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { statAnatomy } from '@chakra-ui/react/anatomy'

// Chakra v3 changed its palette, heading scale and several component recipes. These overrides
// keep the v2 values the site was designed with.
const headingSize = (
  fontSize: string | Record<string, string>,
  lineHeight: number | Record<string, number>
) => ({ textStyle: 'none', fontSize, lineHeight })

const config = defineConfig({
  cssVarsPrefix: 'app',
  theme: {
    tokens: {
      colors: {
        black: { value: '#000000' },
        white: { value: '#FFFFFF' },
        blackAlpha: {
          300: { value: 'rgba(0, 0, 0, 0.16)' },
          800: { value: 'rgba(0, 0, 0, 0.80)' },
        },
        whiteAlpha: { 700: { value: 'rgba(255, 255, 255, 0.64)' } },
        gray: { 100: { value: '#EDF2F7' }, 200: { value: '#E2E8F0' } },
        red: { 500: { value: '#E53E3E' }, 600: { value: '#C53030' } },
        orange: { 400: { value: '#ED8936' }, 500: { value: '#DD6B20' } },
        yellow: { 400: { value: '#ECC94B' }, 500: { value: '#D69E2E' } },
        green: {
          300: { value: '#68D391' },
          400: { value: '#48BB78' },
          500: { value: '#38A169' },
          600: { value: '#2F855A' },
        },
        blue: {
          300: { value: '#63B3ED' },
          400: { value: '#4299E1' },
          500: { value: '#3182CE' },
          600: { value: '#2B6CB0' },
        },
        cyan: { 300: { value: '#76E4F7' }, 500: { value: '#00B5D8' }, 600: { value: '#00A3C4' } },
        purple: { 400: { value: '#9F7AEA' } },
        pink: { 400: { value: '#ED64A6' } },
      },
      fonts: {
        heading: { value: 'var(--font-mono)' },
        body: { value: 'var(--font-mono)' },
        mono: { value: 'var(--font-mono)' },
      },
    },
    slotRecipes: {
      stat: {
        // Slot lists merge by index, so restate the defaults rather than a subset.
        slots: statAnatomy.keys(),
        base: {
          valueText: { letterSpacing: 'normal' },
        },
        variants: { size: { md: { valueText: { textStyle: 'none' } } } },
      },
    },
    recipes: {
      heading: {
        base: { fontWeight: 'bold' },
        variants: {
          size: {
            xs: headingSize('sm', 1.2),
            sm: headingSize('md', 1.2),
            md: headingSize('xl', 1.2),
            lg: headingSize({ base: '2xl', md: '3xl' }, { base: 1.33, md: 1.2 }),
            xl: headingSize({ base: '3xl', md: '4xl' }, { base: 1.33, md: 1.2 }),
            '2xl': headingSize({ base: '4xl', md: '5xl' }, { base: 1.2, md: 1 }),
            '3xl': headingSize({ base: '5xl', md: '6xl' }, 1),
            '4xl': headingSize({ base: '6xl', md: '7xl' }, 1),
          },
        },
      },
      link: {
        base: {
          display: 'inline',
          alignItems: 'normal',
          gap: 0,
          borderRadius: 0,
          color: 'inherit',
          transitionProperty: 'common',
          transitionDuration: 'fast',
          transitionTimingFunction: 'ease-out',
        },
        variants: { variant: { plain: { color: 'inherit' } } },
      },
      kbd: {
        base: {
          display: 'inline',
          fontFamily:
            'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontWeight: 'bold',
          fontSize: '0.8em',
          lineHeight: 'normal',
          px: '0.4em',
          borderRadius: 'md',
          wordSpacing: 'normal',
        },
        variants: {
          variant: {
            raised: { bg: 'gray.100', color: 'inherit', borderBottomWidth: '3px' },
          },
          size: { md: { textStyle: 'none', height: 'auto' } },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
