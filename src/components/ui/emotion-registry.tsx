'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

// Emotion renders its styles as inline <style> tags during SSR, which React reports as a
// hydration mismatch. This registry hands them to Next through useServerInsertedHTML instead, as in
// Chakra's App Router guide (https://chakra-ui.com/docs/get-started/frameworks/next-app). Global
// styles keep their own `css-global` tags so emotion's <Global> adopts them on the client rather
// than inserting them a second time. Remove this once Chakra no longer depends on emotion.
export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [registry] = useState(() => {
    const cache = createCache({ key: 'css' })
    cache.compat = true

    let inserted: { name: string; isGlobal: boolean }[] = []
    const insert = cache.insert
    cache.insert = (...args) => {
      const [selector, serialized] = args
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, isGlobal: !selector })
      }
      return insert(...args)
    }

    const flush = () => {
      const flushed = inserted
      inserted = []
      return flushed
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const inserted = registry.flush()
    if (inserted.length === 0) return null

    const { cache } = registry
    const globals: { name: string; style: string }[] = []
    let styles = ''
    let names = cache.key

    for (const { name, isGlobal } of inserted) {
      const style = cache.inserted[name]
      if (typeof style !== 'string') continue

      if (isGlobal) {
        globals.push({ name, style })
      } else {
        styles += style
        names += ` ${name}`
      }
    }

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${cache.key}-global ${name}`}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: emotion-generated css
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={names}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: emotion-generated css
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    )
  })

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>
}
