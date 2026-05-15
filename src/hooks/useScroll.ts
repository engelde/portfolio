'use client'

import { useScroll as useFramerScroll } from 'framer-motion'

export const useScroll = () => {
  const { scrollX, scrollY } = useFramerScroll()
  return { scrollX, scrollY }
}
