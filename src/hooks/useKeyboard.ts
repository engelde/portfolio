'use client'

import { useEffect, useRef, useState } from 'react'
import { useEventListener } from '@chakra-ui/react'

type KeyboardProps = {
  active: boolean
}

export const useKeyboard = ({ active }: KeyboardProps) => {
  const [up, setUp] = useState(false)
  const [down, setDown] = useState(false)
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)
  const [escape, setEscape] = useState(false)

  const keys = useRef<Set<string>>(new Set())

  useEventListener(window, 'keydown', (event) => {
    if (active && event.code) {
      keys.current.add(event.code)

      if (event.code === 'ArrowUp' || event.code === 'Space') {
        event.preventDefault()
        if (!up) setUp(true)
      } else if (event.code === 'ArrowDown') {
        event.preventDefault()
        if (!down) setDown(true)
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault()
        if (!left) setLeft(true)
      } else if (event.code === 'ArrowRight') {
        event.preventDefault()
        if (!right) setRight(true)
      }

      if (event.code === 'Escape') {
        event.preventDefault()
        if (!escape) setEscape(true)
      }
    }
  })

  useEventListener(window, 'keyup', (event) => {
    if (active && event.code) {
      keys.current.delete(event.code)

      if (event.code === 'ArrowUp' || event.code === 'Space') {
        event.preventDefault()

        if (up) setUp(false)
      } else if (event.code === 'ArrowDown') {
        event.preventDefault()
        if (down) setDown(false)
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault()
        if (left) setLeft(false)
      } else if (event.code === 'ArrowRight') {
        event.preventDefault()
        if (right) setRight(false)
      }

      if (event.code === 'Escape') {
        event.preventDefault()
        setEscape(!!escape)
      }
    }
  })

  useEffect(() => {
    if (!active) {
      keys.current.clear()
      if (up) setUp(false)
      if (down) setDown(false)
      if (left) setLeft(false)
      if (right) setRight(false)
      if (escape) setEscape(false)
    }
  }, [active, up, down, left, right, escape])

  return { up, down, left, right, escape, keys }
}
