'use client'

import { useEffect, useState } from 'react'

export const useWindow = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const updateDimensions = () => {
    if (width !== window.innerWidth) setWidth(window.innerWidth)
    if (height !== window.innerHeight) setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  })

  return { width, height }
}
