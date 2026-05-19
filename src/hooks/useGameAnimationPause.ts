'use client'

import { useEffect, type RefObject } from 'react'

let pauseDepth = 0
let pausedFrameId = 1
let originalRequestAnimationFrame: typeof window.requestAnimationFrame | null = null
let originalCancelAnimationFrame: typeof window.cancelAnimationFrame | null = null
let queuedFrames = new Map<number, FrameRequestCallback>()

const pauseAnimationFrames = () => {
  pauseDepth += 1

  if (originalRequestAnimationFrame) {
    return resumeAnimationFrames
  }

  originalRequestAnimationFrame = window.requestAnimationFrame.bind(window)
  originalCancelAnimationFrame = window.cancelAnimationFrame.bind(window)

  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    const id = pausedFrameId
    pausedFrameId += 1
    queuedFrames.set(id, callback)
    return id
  }

  window.cancelAnimationFrame = (id: number) => {
    if (queuedFrames.delete(id)) return
    originalCancelAnimationFrame?.(id)
  }

  return resumeAnimationFrames
}

const resumeAnimationFrames = () => {
  pauseDepth = Math.max(0, pauseDepth - 1)
  if (pauseDepth > 0 || !originalRequestAnimationFrame || !originalCancelAnimationFrame) return

  const requestFrame = originalRequestAnimationFrame
  window.requestAnimationFrame = originalRequestAnimationFrame
  window.cancelAnimationFrame = originalCancelAnimationFrame
  originalRequestAnimationFrame = null
  originalCancelAnimationFrame = null

  const callbacks = Array.from(queuedFrames.values())
  queuedFrames = new Map()
  callbacks.forEach((callback) => requestFrame(callback))
}

export const useGameAnimationPause = (
  rootRef: RefObject<HTMLElement | null>,
  animationsPaused: boolean
) => {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const syncAnimations = () => {
      root.getAnimations({ subtree: true }).forEach((animation) => {
        if (animationsPaused) {
          if (animation.playState !== 'paused') animation.pause()
          return
        }

        if (animation.playState === 'paused') animation.play()
      })
    }

    syncAnimations()

    if (!animationsPaused) return

    const observer = new MutationObserver(syncAnimations)
    observer.observe(root, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    const resumeFrames = pauseAnimationFrames()

    return () => {
      observer.disconnect()
      resumeFrames()
    }
  }, [animationsPaused, rootRef])
}
