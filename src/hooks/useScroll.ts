'use client'

import { useScroll as useFramerScroll } from 'motion/react'

export const useScroll = () => {
  const { scrollX, scrollY } = useFramerScroll()
  return { scrollX, scrollY }
}
