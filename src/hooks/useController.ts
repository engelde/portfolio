'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useAudio } from '@/hooks/useAudio'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useScroll } from '@/hooks/useScroll'
import { useWindow } from '@/hooks/useWindow'

type ControllerProps = {
  active: boolean
  mario: 1 | 2 | 3
  maximum: {
    length: number
    marioOffset: number
    xOffset: number
    yOffset: number
  }
  mobile: boolean | undefined
  pause: {
    paused: boolean
    setPaused: (val: boolean) => void
  }
  position: {
    ceilingLevels: {
      xMin: number
      xMax: number
      height: number
    }[]
    groundLevels: {
      xMin: number
      xMax: number
      height: number
    }[]
    platformLevels: {
      xMin: number
      xMax: number
      height: number
    }[]
    x: number
    xOffset: number
    y: number
    yOffset: number
  }
  speed: {
    x: number
    y: number
  }
}

export const useController = ({
  active,
  mario,
  mobile,
  maximum,
  pause,
  position,
  speed,
}: ControllerProps) => {
  const { playAudio } = useAudio()
  const { keys, down, escape } = useKeyboard({ active: active })
  const { scrollY } = useScroll()
  const { height } = useWindow()

  // Mutable state for the game loop
  const xRef = useRef(position.x)
  const yRef = useRef(position.y)
  const xOffsetRef = useRef(position.xOffset)
  const yOffsetRef = useRef(position.yOffset)
  const velocityYRef = useRef(0)
  const forwardsRef = useRef(true)
  const jumpRef = useRef(false)
  const jumpLockRef = useRef(false)
  const jumpHeldRef = useRef(false)
  const jumpDisplayRef = useRef(false)
  const runChargeRef = useRef(0)
  const flyingRef = useRef(false)
  const flyTimeRef = useRef(0)
  const lastYScrollRef = useRef(scrollY.get())

  // React state for rendering
  const [renderState, setRenderState] = useState({
    x: position.x,
    y: position.y,
    xOffset: position.xOffset,
    yOffset: position.yOffset,
    forwards: true,
    jump: false,
  })

  const [maxYScroll, setMaxYScroll] = useState(maximum.length + height - 24)

  // Helper to sync refs to state
  const syncState = useCallback(() => {
    setRenderState((prev) => {
      if (
        prev.x === xRef.current &&
        prev.y === yRef.current &&
        prev.xOffset === xOffsetRef.current &&
        prev.yOffset === yOffsetRef.current &&
        prev.forwards === forwardsRef.current &&
        prev.jump === jumpDisplayRef.current
      ) {
        return prev
      }
      return {
        x: xRef.current,
        y: yRef.current,
        xOffset: xOffsetRef.current,
        yOffset: yOffsetRef.current,
        forwards: forwardsRef.current,
        jump: jumpDisplayRef.current,
      }
    })

    const newMaxYScroll = maximum.length + height - 24
    if (maxYScroll !== newMaxYScroll) {
      setMaxYScroll(newMaxYScroll)
    }
  }, [height, maximum.length, maxYScroll])

  // Adjust Y Positioning logic (now uses velocity for parabolic motion)
  const updateY = useCallback(() => {
    if (active) {
      const gravity = 1.6

      // Determine ground height at current X
      let groundHeight = 0
      for (const i of position.groundLevels) {
        if (
          xRef.current + xOffsetRef.current > i.xMin &&
          xRef.current + xOffsetRef.current < i.xMax
        ) {
          groundHeight = i.height
          break
        }
      }

      // Apply Gravity
      velocityYRef.current += gravity
      yOffsetRef.current -= velocityYRef.current

      // Ceiling levels check
      if (velocityYRef.current < 0) {
        for (const i of position.ceilingLevels) {
          // Compute previous absolute feet position (before this frame's gravity step)
          // gravity already applied: vel = oldVel + g; yOffset = oldYOffset - vel
          // therefore: oldYOffset = yOffset + vel  =>  previousFeet = yRef + yOffset + vel
          const previousFeet = yRef.current + yOffsetRef.current + velocityYRef.current
          const currentFeet = yRef.current + yOffsetRef.current
          const ceilingY = i.height - (mario !== 1 ? maximum.marioOffset : 0)
          if (
            xRef.current + xOffsetRef.current > i.xMin &&
            xRef.current + xOffsetRef.current < i.xMax &&
            yRef.current <= i.height &&
            previousFeet < ceilingY && // Was strictly below the ceiling last frame
            currentFeet >= ceilingY // Has now crossed up into it
          ) {
            yOffsetRef.current = i.height - yRef.current - (mario !== 1 ? maximum.marioOffset : 0)
            velocityYRef.current = 0
            jumpLockRef.current = true
            return true
          }
        }
      }

      // Ground/Platform levels check (only when falling or on ground)
      if (velocityYRef.current >= 0) {
        // Platform levels
        if (!mobile) {
          for (const i of position.platformLevels) {
            const previousY = yRef.current + yOffsetRef.current + velocityYRef.current
            const currentY = yRef.current + yOffsetRef.current

            if (
              xRef.current + xOffsetRef.current > i.xMin &&
              xRef.current + xOffsetRef.current < i.xMax &&
              previousY >= i.height && // Was above or on
              currentY <= i.height // Is now below or on
            ) {
              yRef.current = i.height
              yOffsetRef.current = 0
              velocityYRef.current = 0
              return true
            }
          }
        }

        // Ground check
        if (yRef.current + yOffsetRef.current <= groundHeight) {
          yRef.current = groundHeight
          yOffsetRef.current = 0
          velocityYRef.current = 0
          return true
        }
      }

      // Handle falling off platforms: if we are in the air and below our yRef,
      // but still above ground height, we should stay in air and continue falling.
      // If we are below groundHeight, we snap to it.
      if (yOffsetRef.current < 0) {
        if (yRef.current + yOffsetRef.current > groundHeight) {
          // Still falling, adjust yRef and yOffset to maintain absolute height
          yOffsetRef.current = yRef.current + yOffsetRef.current - groundHeight
          yRef.current = groundHeight
        } else {
          // Hit the ground
          yRef.current = groundHeight
          yOffsetRef.current = 0
          velocityYRef.current = 0
        }
      }
    }
    return false
  }, [active, mario, maximum.marioOffset, mobile, position])

  // Game Loop
  useEffect(() => {
    if (!active) return

    let rafId: number

    const tick = () => {
      let moved = false

      const up = keys.current.has('ArrowUp') || keys.current.has('Space')
      const left = keys.current.has('ArrowLeft')
      const right = keys.current.has('ArrowRight')

      // Jump Logic
      if (!mobile) {
        if (up && !jumpHeldRef.current && !jumpLockRef.current && yOffsetRef.current === 0) {
          // Raccoon flight: if P-meter is charged AND we're in the coin-chain launch window,
          // initiate flight. Window brackets the upward 5-coin chain (x=5600..6240) with a
          // small lead-in and a longer trailing buffer for late jump presses.
          const worldX = xRef.current + xOffsetRef.current
          const inFlightWindow = worldX >= 4400 && worldX <= 7400
          if (mario === 3 && runChargeRef.current >= 60 && inFlightWindow) {
            flyingRef.current = true
            flyTimeRef.current = 0
          }
          velocityYRef.current = mario !== 3 ? -30 : -36
          jumpRef.current = true
          jumpHeldRef.current = true
          jumpDisplayRef.current = true
          playAudio('jump')
          moved = true
        } else if (!up && jumpRef.current) {
          // Variable jump height: cut velocity if button released early
          if (velocityYRef.current < -11) {
            velocityYRef.current = -11
          }
          jumpRef.current = false
          moved = true
        }

        if (!up) {
          jumpHeldRef.current = false
        }

        // Clear jump display once apex reached so held button doesn't keep jump pose
        if (jumpDisplayRef.current && velocityYRef.current >= 0) {
          jumpDisplayRef.current = false
          moved = true
        }

        if (up && jumpLockRef.current && yOffsetRef.current === 0) {
          // Stay locked until button released
        } else if (!up && jumpLockRef.current && yOffsetRef.current === 0) {
          jumpLockRef.current = false
        }

        // Raccoon Mario abilities
        if (mario === 3) {
          // Slow descent: hold jump while falling -> tail float
          if (up && velocityYRef.current > 4 && yOffsetRef.current !== 0) {
            velocityYRef.current = 4
            moved = true
          }

          // Flight: while charged, holding jump after takeoff sustains lift (SMB3 tail flap)
          if (flyingRef.current) {
            if (up && flyTimeRef.current < 180) {
              // Sustain a steady upward climb while in flight
              if (velocityYRef.current > -9) {
                velocityYRef.current = -9
              }
              flyTimeRef.current += 1
              moved = true
            } else {
              flyingRef.current = false
              flyTimeRef.current = 0
            }
          }
        }
      }

      // Left Logic
      if (!mobile && !right && left && xRef.current + xOffsetRef.current > 0) {
        if (xRef.current === 0 && xOffsetRef.current > 0) {
          xOffsetRef.current = Math.max(0, xOffsetRef.current - speed.x)
        } else {
          xRef.current = Math.max(0, xRef.current - speed.x)
        }
        if (forwardsRef.current) forwardsRef.current = false

        // Sync scroll
        const newTotal = xRef.current + xOffsetRef.current
        window.scrollTo({ top: newTotal, behavior: 'auto' })
        moved = true
      }

      // Right Logic
      if (!mobile && !left && right && xRef.current + xOffsetRef.current < maximum.length) {
        if (xOffsetRef.current < maximum.xOffset) {
          xOffsetRef.current = Math.min(maximum.xOffset, xOffsetRef.current + speed.x)
        } else {
          xRef.current = Math.min(maximum.length - xOffsetRef.current, xRef.current + speed.x)
        }
        if (!forwardsRef.current) forwardsRef.current = true

        // Sync scroll
        const newTotal = xRef.current + xOffsetRef.current
        window.scrollTo({ top: newTotal, behavior: 'auto' })
        moved = true

        // Charge raccoon P-meter while running on ground
        if (mario === 3 && yOffsetRef.current === 0 && !flyingRef.current) {
          if (runChargeRef.current < 60) runChargeRef.current += 1
        }
      } else if (!flyingRef.current) {
        // Decay run-charge when not actively running right (preserve while flying)
        if (runChargeRef.current > 0 && yOffsetRef.current === 0) {
          runChargeRef.current = Math.max(0, runChargeRef.current - 2)
        }
      }

      // Scroll Logic (sync with React-driven scroll)
      const currentYScroll = scrollY.get()
      if (!left && !right && lastYScrollRef.current !== currentYScroll) {
        const total = Math.max(0, Math.min(maximum.length, currentYScroll))

        if (total < maximum.xOffset) {
          xOffsetRef.current = total
          xRef.current = 0
        } else {
          xOffsetRef.current = maximum.xOffset
          xRef.current = total - maximum.xOffset
        }

        if (currentYScroll > lastYScrollRef.current) {
          if (!forwardsRef.current) forwardsRef.current = true
        } else if (currentYScroll < lastYScrollRef.current) {
          if (forwardsRef.current) forwardsRef.current = false
        }

        lastYScrollRef.current = currentYScroll
        moved = true
      }

      // Always update physics
      if (updateY()) {
        moved = true
      } else if (yOffsetRef.current > 0 || velocityYRef.current !== 0) {
        moved = true
      }

      if (moved) {
        syncState()
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [
    active,
    keys,
    mario,
    maximum.length,
    maximum.xOffset,
    mobile,
    playAudio,
    speed.x,
    syncState,
    updateY,
    scrollY,
  ])

  // Resize
  useEffect(() => {
    const newMaxYScroll = maximum.length + height - xOffsetRef.current - 24
    if (maxYScroll !== newMaxYScroll) {
      setMaxYScroll(newMaxYScroll)
    }
  }, [height, maximum.length, maxYScroll])

  // Pause
  useEffect(() => {
    if (!pause.paused && escape) {
      pause.setPaused(true)
      playAudio('pause')
    }
  }, [escape, pause, playAudio])

  return {
    down,
    forwards: renderState.forwards,
    jump: renderState.jump,
    x: renderState.x,
    y: renderState.y,
    maxYScroll,
    xOffset: renderState.xOffset,
    yOffset: renderState.yOffset,
    setX: (val: number) => {
      xRef.current = val
      syncState()
    },
    setY: (val: number) => {
      yRef.current = val
      syncState()
    },
  }
}
