'use client'

import { useEffect, useState } from 'react'
import { useScroll as useFramerScroll } from 'framer-motion'

type ScrollProps = {
  active: boolean
}

export const useScroll = ({ active }: ScrollProps) => {
  const [xScroll, setXScroll] = useState(0)
  const [yScroll, setYScroll] = useState(0)
  const { scrollX, scrollY } = useFramerScroll()

  useEffect(() => {
    return scrollX.on('change', () => {
      if (active && xScroll !== scrollX.get()) {
        setXScroll(scrollX.get())
      }
    })
  }, [active, xScroll, scrollX])

  useEffect(() => {
    return scrollY.on('change', () => {
      if (active && yScroll !== scrollY.get()) {
        setYScroll(scrollY.get())
      }
    })
  }, [active, yScroll, scrollY])

  return { xScroll, yScroll }
}
