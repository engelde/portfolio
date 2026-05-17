'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  findLandingSurface,
  findStepSurface,
  findSupportSurface,
  getLowestGroundHeight,
  type CollisionCeiling,
  type CollisionSurface,
} from '@/components/super-mario/level-map'
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
    ceilingLevels: CollisionCeiling[]
    groundLevels: CollisionSurface[]
    platformLevels: CollisionSurface[]
    surfaceLevels: CollisionSurface[]
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
  const { keys, down, escape, up, left, right } = useKeyboard({ active: active })
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
  const groundedRef = useRef(true)
  const runChargeRef = useRef(0)
  const flyingRef = useRef(false)
  const flyTimeRef = useRef(0)
  const lastYScrollRef = useRef(scrollY.get())
  const keyboardDirectionLockUntilRef = useRef(0)
  const programmaticScrollTargetRef = useRef<number | null>(null)

  // React state for rendering
  const [renderState, setRenderState] = useState({
    x: position.x,
    y: position.y,
    xOffset: position.xOffset,
    yOffset: position.yOffset,
    forwards: true,
    falling: false,
    jump: false,
  })
  const [forwards, setForwards] = useState(true)
  const [loopWake, setLoopWake] = useState(0)

  const [maxYScroll, setMaxYScroll] = useState(maximum.length + height)

  const updateForwards = useCallback((nextForwards: boolean) => {
    forwardsRef.current = nextForwards
    setForwards((prev) => (prev === nextForwards ? prev : nextForwards))
  }, [])

  const isCrouching = useCallback(
    () => down && mario !== 1 && !jumpDisplayRef.current,
    [down, mario]
  )

  const markKeyboardDirectionInput = useCallback(() => {
    keyboardDirectionLockUntilRef.current = performance.now() + 280
  }, [])

  // Helper to sync refs to state
  const syncState = useCallback(() => {
    setForwards((prev) => (prev === forwardsRef.current ? prev : forwardsRef.current))

    setRenderState((prev) => {
      if (
        prev.x === xRef.current &&
        prev.y === yRef.current &&
        prev.xOffset === xOffsetRef.current &&
        prev.yOffset === yOffsetRef.current &&
        prev.forwards === forwardsRef.current &&
        prev.falling === velocityYRef.current > 0 &&
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
        falling: velocityYRef.current > 0,
        jump: jumpDisplayRef.current,
      }
    })

    const newMaxYScroll = maximum.length + height
    if (maxYScroll !== newMaxYScroll) {
      setMaxYScroll(newMaxYScroll)
    }
  }, [height, maximum.length, maxYScroll])

  const startJump = useCallback(
    (force = false) => {
      if (mobile || isCrouching() || (!force && (jumpHeldRef.current || jumpLockRef.current))) {
        return false
      }

      const worldX = xRef.current + xOffsetRef.current
      const recoverSurface =
        force &&
        !jumpDisplayRef.current &&
        velocityYRef.current === 0 &&
        (groundedRef.current || yOffsetRef.current !== 0)

      if (!groundedRef.current && !recoverSurface) {
        return false
      }

      if (recoverSurface) {
        yRef.current += yOffsetRef.current
        yOffsetRef.current = 0
      }

      const inFlightWindow = worldX >= 4400 && worldX <= 7400
      if (mario === 3 && runChargeRef.current >= 60 && inFlightWindow) {
        flyingRef.current = true
        flyTimeRef.current = 0
      }

      velocityYRef.current = mario !== 3 ? -30 : -36
      groundedRef.current = false
      jumpRef.current = true
      jumpHeldRef.current = true
      jumpDisplayRef.current = true
      playAudio('jump')
      syncState()
      return true
    },
    [isCrouching, mario, mobile, playAudio, syncState]
  )

  useEffect(() => {
    if (!active || mobile) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'ArrowUp' || event.code === 'Space') {
        event.preventDefault()
        if (!event.repeat && startJump(true)) {
          setLoopWake((val) => val + 1)
        }
        return
      }

      if (event.code !== 'ArrowLeft' && event.code !== 'ArrowRight') return
      event.preventDefault()

      const nextForwards = event.code === 'ArrowRight'
      markKeyboardDirectionInput()
      updateForwards(nextForwards)
      syncState()
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code !== 'ArrowUp' && event.code !== 'Space') return
      event.preventDefault()

      jumpHeldRef.current = false
      if (jumpRef.current && velocityYRef.current < -11) {
        velocityYRef.current = -11
      }
      jumpRef.current = false
      if (yOffsetRef.current === 0 && velocityYRef.current === 0) {
        jumpLockRef.current = false
        groundedRef.current = true
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [active, markKeyboardDirectionInput, mobile, startJump, syncState, updateForwards])

  useEffect(() => {
    if (up) return

    jumpHeldRef.current = false
    if (yOffsetRef.current === 0 && velocityYRef.current === 0) {
      jumpRef.current = false
      jumpLockRef.current = false
      groundedRef.current = true
    }
  }, [up])

  const syncScrollPosition = useCallback(
    (currentYScroll: number) => {
      if (!active) return

      const target = programmaticScrollTargetRef.current
      if (target !== null && Math.abs(currentYScroll - target) < 1) {
        lastYScrollRef.current = currentYScroll
        programmaticScrollTargetRef.current = null
        return
      }

      const keyboardDirectionActive =
        !mobile &&
        (keys.current.has('ArrowLeft') ||
          keys.current.has('ArrowRight') ||
          performance.now() < keyboardDirectionLockUntilRef.current)

      if (keyboardDirectionActive) {
        lastYScrollRef.current = currentYScroll
        return
      }

      if (lastYScrollRef.current === currentYScroll) return

      const total = Math.max(0, Math.min(maximum.length, currentYScroll))

      if (total < maximum.xOffset) {
        xOffsetRef.current = total
        xRef.current = 0
      } else {
        xOffsetRef.current = maximum.xOffset
        xRef.current = total - maximum.xOffset
      }

      if (currentYScroll > lastYScrollRef.current) {
        updateForwards(true)
      } else if (currentYScroll < lastYScrollRef.current) {
        updateForwards(false)
      }

      if (yOffsetRef.current === 0 && velocityYRef.current === 0) {
        const support = findSupportSurface(
          position.surfaceLevels,
          total,
          yRef.current,
          mario,
          forwardsRef.current,
          isCrouching()
        )
        const stepSurface =
          support ??
          findStepSurface(
            position.surfaceLevels,
            total,
            yRef.current,
            mario,
            forwardsRef.current,
            isCrouching()
          )

        if (stepSurface) {
          yRef.current = stepSurface.height
          groundedRef.current = true
        } else {
          groundedRef.current = false
          setLoopWake((val) => val + 1)
        }
      }

      lastYScrollRef.current = currentYScroll
      syncState()
    },
    [
      active,
      isCrouching,
      keys,
      mario,
      maximum.length,
      maximum.xOffset,
      mobile,
      position.surfaceLevels,
      syncState,
      updateForwards,
    ]
  )

  // Adjust Y Positioning logic (now uses velocity for parabolic motion)
  const updateY = useCallback(() => {
    if (active) {
      const gravity = 1.6
      const worldX = xRef.current + xOffsetRef.current
      const crouching = isCrouching()
      const previousFeet = yRef.current + yOffsetRef.current

      // Apply Gravity
      velocityYRef.current += gravity
      yOffsetRef.current -= velocityYRef.current
      const currentFeet = yRef.current + yOffsetRef.current
      if (velocityYRef.current !== 0 || yOffsetRef.current !== 0) {
        groundedRef.current = false
      }

      // Ceiling levels check
      if (velocityYRef.current < 0) {
        for (const i of position.ceilingLevels) {
          const ceilingY = i.height - (mario !== 1 ? maximum.marioOffset : 0)
          if (
            worldX > i.xMin &&
            worldX < i.xMax &&
            yRef.current <= i.height &&
            previousFeet < ceilingY && // Was strictly below the ceiling last frame
            currentFeet >= ceilingY // Has now crossed up into it
          ) {
            yOffsetRef.current = i.height - yRef.current - (mario !== 1 ? maximum.marioOffset : 0)
            velocityYRef.current = 0
            groundedRef.current = false
            jumpLockRef.current = true
            return true
          }
        }
      }

      // Ground/Platform levels check (only when falling or on ground)
      if (velocityYRef.current >= 0) {
        const landing = findLandingSurface(
          position.surfaceLevels,
          worldX,
          previousFeet,
          currentFeet,
          mario,
          forwardsRef.current,
          crouching
        )

        if (landing) {
          yRef.current = landing.height
          yOffsetRef.current = 0
          velocityYRef.current = 0
          groundedRef.current = true
          return true
        }
      }

      const lowestGroundHeight = getLowestGroundHeight(
        position.surfaceLevels,
        worldX,
        mario,
        forwardsRef.current,
        crouching
      )

      if (currentFeet < lowestGroundHeight - 260) {
        yRef.current = lowestGroundHeight
        yOffsetRef.current = 0
        velocityYRef.current = 0
        groundedRef.current = true
        return true
      }
    }
    return false
  }, [
    active,
    isCrouching,
    mario,
    maximum.marioOffset,
    position.ceilingLevels,
    position.surfaceLevels,
  ])

  // Game Loop
  useEffect(() => {
    if (!active || mobile) return

    let rafId: number

    const shouldTick = () =>
      keys.current.has('ArrowUp') ||
      keys.current.has('Space') ||
      keys.current.has('ArrowLeft') ||
      keys.current.has('ArrowRight') ||
      yOffsetRef.current !== 0 ||
      velocityYRef.current !== 0 ||
      jumpDisplayRef.current ||
      flyingRef.current

    const tick = () => {
      let moved = false

      const upPressed = keys.current.has('ArrowUp') || keys.current.has('Space')
      const leftPressed = keys.current.has('ArrowLeft')
      const rightPressed = keys.current.has('ArrowRight')
      const crouching = isCrouching()

      // Jump Logic
      if (!mobile) {
        if (!crouching && upPressed && startJump()) {
          moved = true
        } else if (!upPressed && jumpRef.current) {
          // Variable jump height: cut velocity if button released early
          if (velocityYRef.current < -11) {
            velocityYRef.current = -11
          }
          jumpRef.current = false
          moved = true
        }

        if (!upPressed) {
          jumpHeldRef.current = false
        }

        // Clear jump display once apex reached so held button doesn't keep jump pose
        if (jumpDisplayRef.current && velocityYRef.current >= 0) {
          jumpDisplayRef.current = false
          moved = true
        }

        if (upPressed && jumpLockRef.current && yOffsetRef.current === 0) {
          // Stay locked until button released
        } else if (!upPressed && jumpLockRef.current && yOffsetRef.current === 0) {
          jumpLockRef.current = false
        }

        // Raccoon Mario abilities
        if (mario === 3) {
          // Slow descent: hold jump while falling -> tail float
          if (upPressed && velocityYRef.current > 4 && yOffsetRef.current !== 0) {
            velocityYRef.current = 4
            moved = true
          }

          // Flight: while charged, holding jump after takeoff sustains lift (SMB3 tail flap)
          if (flyingRef.current) {
            if (upPressed && flyTimeRef.current < 180) {
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
      if (
        !mobile &&
        !crouching &&
        !rightPressed &&
        leftPressed &&
        xRef.current + xOffsetRef.current > 0
      ) {
        markKeyboardDirectionInput()
        if (xRef.current === 0 && xOffsetRef.current > 0) {
          xOffsetRef.current = Math.max(0, xOffsetRef.current - speed.x)
        } else {
          xRef.current = Math.max(0, xRef.current - speed.x)
        }
        if (forwardsRef.current) updateForwards(false)

        // Sync scroll
        const newTotal = xRef.current + xOffsetRef.current
        lastYScrollRef.current = newTotal
        programmaticScrollTargetRef.current = newTotal
        window.scrollTo({ top: newTotal, behavior: 'auto' })
        moved = true
      }

      // Right Logic
      if (
        !mobile &&
        !crouching &&
        !leftPressed &&
        rightPressed &&
        xRef.current + xOffsetRef.current < maximum.length
      ) {
        markKeyboardDirectionInput()
        if (xOffsetRef.current < maximum.xOffset) {
          xOffsetRef.current = Math.min(maximum.xOffset, xOffsetRef.current + speed.x)
        } else {
          xRef.current = Math.min(maximum.length - xOffsetRef.current, xRef.current + speed.x)
        }
        if (!forwardsRef.current) updateForwards(true)

        // Sync scroll
        const newTotal = xRef.current + xOffsetRef.current
        lastYScrollRef.current = newTotal
        programmaticScrollTargetRef.current = newTotal
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

      // Always update physics
      if (updateY()) {
        moved = true
      } else if (yOffsetRef.current > 0 || velocityYRef.current !== 0) {
        moved = true
      }

      if (moved) {
        syncState()
      }

      if (shouldTick()) {
        rafId = requestAnimationFrame(tick)
      }
    }

    if (!shouldTick()) return

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [
    active,
    keys,
    left,
    loopWake,
    isCrouching,
    markKeyboardDirectionInput,
    mario,
    maximum.length,
    maximum.xOffset,
    mobile,
    right,
    speed.x,
    startJump,
    syncState,
    updateY,
    updateForwards,
    up,
  ])

  useEffect(() => {
    const unsubscribe = scrollY.on('change', syncScrollPosition)
    syncScrollPosition(scrollY.get())
    return () => unsubscribe()
  }, [scrollY, syncScrollPosition])

  // Resize
  useEffect(() => {
    const newMaxYScroll = maximum.length + height
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
    falling: renderState.falling,
    forwards,
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
