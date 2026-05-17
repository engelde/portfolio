'use client'

import { useEffect, useState } from 'react'

export const useWindow = () => {
  const [width, setWidth] = useState(() => window.innerWidth)
  const [height, setHeight] = useState(() => window.innerHeight)

  useEffect(() => {
    const updateDimensions = () => {
      setWidth((current) => (current === window.innerWidth ? current : window.innerWidth))
      setHeight((current) => (current === window.innerHeight ? current : window.innerHeight))
    }

    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return { width, height }
}
