'use client'

import { useEffect, useRef, useState } from 'react'

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
  const stateRef = useRef({ up, down, left, right, escape })

  useEffect(() => {
    stateRef.current = { up, down, left, right, escape }
  }, [up, down, left, right, escape])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!active || !event.code) return

      keys.current.add(event.code)

      if (event.code === 'ArrowUp' || event.code === 'Space') {
        event.preventDefault()
        if (!stateRef.current.up) setUp(true)
      } else if (event.code === 'ArrowDown') {
        event.preventDefault()
        if (!stateRef.current.down) setDown(true)
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault()
        if (!stateRef.current.left) setLeft(true)
      } else if (event.code === 'ArrowRight') {
        event.preventDefault()
        if (!stateRef.current.right) setRight(true)
      }

      if (event.code === 'Escape') {
        event.preventDefault()
        if (!stateRef.current.escape) setEscape(true)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!active || !event.code) return

      keys.current.delete(event.code)

      if (event.code === 'ArrowUp' || event.code === 'Space') {
        event.preventDefault()
        if (stateRef.current.up) setUp(false)
      } else if (event.code === 'ArrowDown') {
        event.preventDefault()
        if (stateRef.current.down) setDown(false)
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault()
        if (stateRef.current.left) setLeft(false)
      } else if (event.code === 'ArrowRight') {
        event.preventDefault()
        if (stateRef.current.right) setRight(false)
      }

      if (event.code === 'Escape') {
        event.preventDefault()
        setEscape(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [active])

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
