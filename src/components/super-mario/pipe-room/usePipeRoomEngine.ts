import { useCallback, useEffect, useRef, useState } from 'react'

import { useAudio } from '@/hooks/useAudio'

import {
  canExitThroughPipe,
  clamp,
  findLandingSurface,
  findStandingSurface,
  getMovementBounds,
  getOverlap,
  getPipeCenteredPlayerX,
  getPlayerRect,
  resolveCeiling,
  resolveHorizontal,
  resolveSolidOverlap,
  resolveSurfaceFollowMovement,
  supportTolerance,
} from './physics'
import type { PipeRoomLayout, Position } from './types'
import { playerSprites } from './types'

export const pipeRoomExitDelay = 620

const defaultPipeExitTravel = 160
const gravity = 1.35
const jumpVelocity = -24
const moveSpeed = 8
const wheelSpeed = 0.42
const coinCollectAnimationMs = 650
const coinCollectionOverlap = 24
const defaultStepDurationMs = 150
const defaultStepHopHeight = 10
const isMessageFormTarget = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('[data-pipe-room-message-form="true"]'))

type StepTransition = {
  duration: number
  end: Position
  hopHeight: number
  start: Position
  startedAt: number
}

type UsePipeRoomEngineProps = {
  collectedCoinIds: Record<string, true>
  layout: PipeRoomLayout
  onCollectCoin: (id: string, value: number) => void
  onExit: () => void
  variant: 1 | 2 | 3
}

export const usePipeRoomEngine = ({
  collectedCoinIds,
  layout,
  onCollectCoin,
  onExit,
  variant,
}: UsePipeRoomEngineProps) => {
  const { playAudio } = useAudio()
  const sprite = playerSprites[variant]
  const { minX, maxX } = getMovementBounds(layout, sprite)
  const [position, setPosition] = useState<Position>({
    x: clamp(getPipeCenteredPlayerX(layout.entrance.pipe, layout.tileSize, sprite), minX, maxX),
    y: -sprite.height - layout.tileSize,
  })
  const positionRef = useRef(position)
  const velocityYRef = useRef(0)
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const exitFrameRef = useRef<number | null>(null)
  const exitingRef = useRef(false)
  const groundedRef = useRef(false)
  const keysRef = useRef(new Set<string>())
  const formFocusedRef = useRef(false)
  const crouchingRef = useRef(false)
  const facingRef = useRef(true)
  const frameRef = useRef<number | null>(null)
  const roomRef = useRef<HTMLDivElement | null>(null)
  const stepTransitionRef = useRef<StepTransition | null>(null)
  const collectedCoinIdsRef = useRef(collectedCoinIds)
  const collectingCoinIdsRef = useRef<Record<string, true>>({})
  const coinTimeoutsRef = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const [exiting, setExiting] = useState(false)
  const [crouching, setCrouching] = useState(false)
  const [collectingCoinIds, setCollectingCoinIds] = useState<Record<string, true>>({})
  const [exitTop, setExitTop] = useState<number | null>(null)
  const crouchingFrame = crouching && sprite.name !== 'regular' && groundedRef.current && !exiting
  const frame = crouchingFrame
    ? 3
    : groundedRef.current
      ? Math.floor(Math.abs(position.x) / 72) % 2
      : 2
  const playerTransform = !facingRef.current ? 'scaleX(-1)' : undefined
  const playerTop = exitTop ?? position.y

  const syncPosition = useCallback((next: Position) => {
    positionRef.current = next
    setPosition(next)
  }, [])

  const syncCrouching = useCallback((next: boolean) => {
    crouchingRef.current = next
    setCrouching(next)
  }, [])

  const clearMovementKeys = useCallback(() => {
    keysRef.current.clear()
    syncCrouching(false)
  }, [syncCrouching])

  const getStairTransition = useCallback(
    (start: Position, end: Position, direction: number) => {
      if (direction === 0 || Math.abs(start.y - end.y) <= supportTolerance) return null

      const startSurface = Math.round(start.y + sprite.height)
      const endSurface = Math.round(end.y + sprite.height)

      for (const path of layout.stairPaths) {
        const startIndex = path.steps.findIndex(({ y }) => Math.abs(y - startSurface) <= 2)
        const endIndex = path.steps.findIndex(({ y }) => Math.abs(y - endSurface) <= 2)
        if (startIndex === -1 || endIndex === -1 || Math.abs(startIndex - endIndex) !== 1) {
          continue
        }

        const expectedDirection =
          path.direction === 'right'
            ? Math.sign(endIndex - startIndex)
            : -Math.sign(endIndex - startIndex)

        if (expectedDirection !== direction) continue

        return {
          duration: path.stepDurationMs ?? defaultStepDurationMs,
          hopHeight: path.hopHeight ?? defaultStepHopHeight,
        }
      }

      return null
    },
    [layout.stairPaths, sprite.height]
  )

  const startStepTransition = useCallback(
    (start: Position, end: Position, direction: number) => {
      const settings = getStairTransition(start, end, direction)
      if (!settings) return false

      const steppingDown = end.y > start.y

      stepTransitionRef.current = {
        duration: settings.duration,
        end,
        hopHeight: steppingDown ? settings.hopHeight * 0.3 : settings.hopHeight,
        start,
        startedAt: performance.now(),
      }
      velocityYRef.current = 0
      groundedRef.current = false
      return true
    },
    [getStairTransition]
  )

  const setCoinCollecting = useCallback((id: string, collecting: boolean) => {
    const next = { ...collectingCoinIdsRef.current }

    if (collecting) {
      next[id] = true
    } else {
      delete next[id]
    }

    collectingCoinIdsRef.current = next
    setCollectingCoinIds(next)
  }, [])

  const collectCoinsAt = useCallback(
    (nextPosition: Position) => {
      const player = getPlayerRect(nextPosition, sprite)

      layout.coins.forEach((coin) => {
        if (collectedCoinIdsRef.current[coin.id] || collectingCoinIdsRef.current[coin.id]) return

        const horizontalOverlap = getOverlap(
          player.left,
          player.right,
          coin.x,
          coin.x + layout.tileSize
        )
        const verticalOverlap = getOverlap(
          player.top,
          player.bottom,
          coin.y,
          coin.y + layout.tileSize
        )

        if (horizontalOverlap < coinCollectionOverlap || verticalOverlap < coinCollectionOverlap) {
          return
        }

        setCoinCollecting(coin.id, true)
        onCollectCoin(coin.id, coin.value ?? 100)
        playAudio('coin')

        const currentTimeout = coinTimeoutsRef.current.get(coin.id)
        if (currentTimeout) clearTimeout(currentTimeout)

        const timeout = setTimeout(() => {
          coinTimeoutsRef.current.delete(coin.id)
          setCoinCollecting(coin.id, false)
        }, coinCollectAnimationMs)

        coinTimeoutsRef.current.set(coin.id, timeout)
      })
    },
    [layout.coins, layout.tileSize, onCollectCoin, playAudio, setCoinCollecting, sprite]
  )

  const startExit = useCallback(
    (startPosition = positionRef.current) => {
      if (exitingRef.current) return

      const centeredX = getPipeCenteredPlayerX(layout.exit.pipe, layout.tileSize, sprite)
      const visibleStartY = clamp(
        startPosition.y,
        layout.exit.mouthY - sprite.height + layout.exit.mouthTolerance,
        layout.exit.mouthY + layout.exit.mouthTolerance
      )
      const travel = Math.max(
        defaultPipeExitTravel,
        visibleStartY + sprite.height + layout.tileSize
      )

      exitingRef.current = true
      keysRef.current.clear()
      syncCrouching(false)
      facingRef.current = true
      velocityYRef.current = 0
      groundedRef.current = false
      setExitTop(null)
      syncPosition({
        x: centeredX,
        y: visibleStartY,
      })
      setExiting(true)
      exitFrameRef.current = requestAnimationFrame(() => {
        exitFrameRef.current = null
        setExitTop(visibleStartY - travel)
      })
      playAudio('pipe')

      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
      exitTimeoutRef.current = setTimeout(() => {
        exitTimeoutRef.current = null
        onExit()
      }, pipeRoomExitDelay)
    },
    [layout, onExit, playAudio, sprite, syncCrouching, syncPosition]
  )

  useEffect(() => {
    collectedCoinIdsRef.current = collectedCoinIds
  }, [collectedCoinIds])

  useEffect(() => {
    if (sprite.name === 'regular') syncCrouching(false)
  }, [sprite.name, syncCrouching])

  useEffect(() => {
    const current = positionRef.current
    const nextX = clamp(current.x, minX, maxX)
    const standingSurface = findStandingSurface(layout, { x: nextX, y: current.y }, sprite)

    syncPosition({
      x: nextX,
      y: standingSurface === null ? current.y : standingSurface - sprite.height,
    })
  }, [layout, maxX, minX, sprite, syncPosition])

  useEffect(() => {
    let lastFrame = performance.now()

    const tick = (time: number) => {
      if (exitingRef.current) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      const scale = Math.min(2, Math.max(0.5, (time - lastFrame) / 16.67))
      lastFrame = time

      const transition = stepTransitionRef.current
      if (transition) {
        const progress = clamp((time - transition.startedAt) / transition.duration, 0, 1)
        const eased = 0.5 - Math.cos(progress * Math.PI) / 2
        const hop = Math.sin(progress * Math.PI) * transition.hopHeight
        const next = {
          x: transition.start.x + (transition.end.x - transition.start.x) * eased,
          y: transition.start.y + (transition.end.y - transition.start.y) * eased - hop,
        }

        collectCoinsAt(next)
        syncPosition(progress >= 1 ? transition.end : next)

        if (progress >= 1) {
          stepTransitionRef.current = null
          groundedRef.current = true
          velocityYRef.current = 0
        }

        frameRef.current = requestAnimationFrame(tick)
        return
      }

      const current = positionRef.current
      const keys = keysRef.current
      const controlsEnabled = !formFocusedRef.current
      const crouching = crouchingRef.current && sprite.name !== 'regular' && groundedRef.current
      let nextX = current.x
      let nextY = current.y
      let moved = false

      if (controlsEnabled && !crouching && keys.has('ArrowLeft') && !keys.has('ArrowRight')) {
        if (groundedRef.current && velocityYRef.current === 0) {
          const resolved = resolveSurfaceFollowMovement(
            layout,
            { x: nextX, y: nextY },
            nextX - moveSpeed * scale,
            sprite,
            minX,
            maxX
          )
          if (startStepTransition({ x: nextX, y: nextY }, resolved.position, -1)) {
            frameRef.current = requestAnimationFrame(tick)
            return
          }
          nextX = resolved.position.x
          nextY = resolved.position.y
          groundedRef.current = resolved.grounded
        } else {
          nextX = resolveHorizontal(
            layout,
            nextX,
            nextX - moveSpeed * scale,
            current.y,
            sprite,
            minX,
            maxX
          )
        }
        facingRef.current = false
        moved = true
      }

      if (controlsEnabled && !crouching && keys.has('ArrowRight') && !keys.has('ArrowLeft')) {
        if (groundedRef.current && velocityYRef.current === 0) {
          const resolved = resolveSurfaceFollowMovement(
            layout,
            { x: nextX, y: nextY },
            nextX + moveSpeed * scale,
            sprite,
            minX,
            maxX
          )
          if (startStepTransition({ x: nextX, y: nextY }, resolved.position, 1)) {
            frameRef.current = requestAnimationFrame(tick)
            return
          }
          nextX = resolved.position.x
          nextY = resolved.position.y
          groundedRef.current = resolved.grounded
        } else {
          nextX = resolveHorizontal(
            layout,
            nextX,
            nextX + moveSpeed * scale,
            current.y,
            sprite,
            minX,
            maxX
          )
        }
        facingRef.current = true
        moved = true
      }

      if (groundedRef.current) {
        const standingSurface = findStandingSurface(layout, { x: nextX, y: nextY }, sprite)

        if (standingSurface === null) {
          groundedRef.current = false
        } else {
          nextY = standingSurface - sprite.height
        }
      }

      if (!groundedRef.current || velocityYRef.current !== 0) {
        const previousY = nextY
        velocityYRef.current += gravity * scale
        nextY += velocityYRef.current * scale
        moved = true

        if (velocityYRef.current >= 0) {
          const landingSurface = findLandingSurface(
            layout,
            { x: nextX, y: nextY },
            previousY,
            sprite
          )

          if (landingSurface !== null) {
            nextY = landingSurface - sprite.height
            velocityYRef.current = 0
            groundedRef.current = true
          }
        } else {
          const resolvedY = resolveCeiling(layout, { x: nextX, y: nextY }, sprite)

          if (resolvedY !== nextY) {
            nextY = resolvedY
            velocityYRef.current = 0
          }
        }

        const resolved = resolveSolidOverlap(
          layout,
          { x: nextX, y: nextY },
          previousY,
          sprite,
          minX,
          maxX,
          velocityYRef.current >= 0
        )

        nextX = resolved.position.x
        nextY = resolved.position.y

        if (resolved.grounded) {
          velocityYRef.current = 0
          groundedRef.current = true
        }
      }

      collectCoinsAt({ x: nextX, y: nextY })

      if (
        canExitThroughPipe(
          { x: nextX, y: nextY },
          sprite,
          velocityYRef.current,
          layout.exit,
          layout.tileSize
        )
      ) {
        startExit({ x: nextX, y: nextY })
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      if (moved) syncPosition({ x: nextX, y: nextY })

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [collectCoinsAt, layout, maxX, minX, sprite, startExit, startStepTransition, syncPosition])

  useEffect(() => {
    const coinTimeouts = coinTimeoutsRef.current

    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
      if (exitFrameRef.current !== null) cancelAnimationFrame(exitFrameRef.current)
      stepTransitionRef.current = null
      coinTimeouts.forEach((timeout) => clearTimeout(timeout))
      coinTimeouts.clear()
    }
  }, [])

  useEffect(() => {
    const jump = () => {
      if (!groundedRef.current || crouchingRef.current) return

      groundedRef.current = false
      velocityYRef.current = jumpVelocity
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (formFocusedRef.current || isMessageFormTarget(event.target)) {
        clearMovementKeys()
        return
      }

      if (
        event.code !== 'ArrowLeft' &&
        event.code !== 'ArrowRight' &&
        event.code !== 'ArrowDown' &&
        event.code !== 'ArrowUp' &&
        event.code !== 'Space'
      ) {
        return
      }

      event.preventDefault()
      if (exitingRef.current) return

      keysRef.current.add(event.code)

      if (event.code === 'ArrowDown') {
        if (sprite.name !== 'regular' && groundedRef.current) syncCrouching(true)
        return
      }

      if (event.code === 'ArrowUp' || event.code === 'Space') jump()
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (formFocusedRef.current || isMessageFormTarget(event.target)) {
        clearMovementKeys()
        return
      }

      if (
        event.code !== 'ArrowLeft' &&
        event.code !== 'ArrowRight' &&
        event.code !== 'ArrowDown' &&
        event.code !== 'ArrowUp' &&
        event.code !== 'Space'
      ) {
        return
      }

      event.preventDefault()
      keysRef.current.delete(event.code)

      if (event.code === 'ArrowDown') syncCrouching(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [clearMovementKeys, sprite.name, syncCrouching])

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if (!isMessageFormTarget(event.target)) return

      formFocusedRef.current = true
      clearMovementKeys()
    }

    const handleFocusOut = () => {
      requestAnimationFrame(() => {
        if (isMessageFormTarget(document.activeElement)) return

        formFocusedRef.current = false
        clearMovementKeys()
      })
    }

    window.addEventListener('focusin', handleFocusIn)
    window.addEventListener('focusout', handleFocusOut)

    return () => {
      window.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('focusout', handleFocusOut)
    }
  }, [clearMovementKeys])

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (delta === 0) return

      event.preventDefault()
      if (exitingRef.current || formFocusedRef.current) return

      const current = positionRef.current
      const nextX = resolveHorizontal(
        layout,
        current.x,
        current.x + delta * wheelSpeed,
        current.y,
        sprite,
        minX,
        maxX
      )
      const nextY = current.y

      if (nextX === current.x && nextY === current.y) return

      facingRef.current = nextX > current.x

      if (groundedRef.current) {
        const standingSurface = findStandingSurface(layout, { x: nextX, y: nextY }, sprite)

        if (standingSurface !== null) {
          groundedRef.current = true
          syncPosition({ x: nextX, y: standingSurface - sprite.height })
          return
        }

        groundedRef.current = false
      }

      syncPosition({ x: nextX, y: nextY })
    },
    [layout, maxX, minX, sprite, syncPosition]
  )

  useEffect(() => {
    const room = roomRef.current
    if (!room) return

    room.addEventListener('wheel', handleWheel, { passive: false })

    return () => room.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  return {
    collectingCoinIds,
    exiting,
    frame,
    playerTop,
    playerTransform,
    position,
    roomRef,
    sprite,
  }
}
