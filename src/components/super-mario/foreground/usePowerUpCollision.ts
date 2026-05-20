'use client'

import { useEffect, type RefObject } from 'react'

type UsePowerUpCollisionOptions = {
  animationsPaused?: boolean
  enabled: boolean
  onCollect: () => void
  powerUpRef: RefObject<HTMLElement | null>
}

const collisionInset = 6

const getInsetRect = (rect: DOMRect, inset = collisionInset) => ({
  bottom: rect.bottom - inset,
  left: rect.left + inset,
  right: rect.right - inset,
  top: rect.top + inset,
})

const intersects = (
  first: ReturnType<typeof getInsetRect>,
  second: ReturnType<typeof getInsetRect>
) =>
  first.left < second.right &&
  first.right > second.left &&
  first.top < second.bottom &&
  first.bottom > second.top

const getPlayerElement = () =>
  document.querySelector<HTMLElement>(
    '[aria-label="mario"][role="img"], [aria-label="luigi"][role="img"]'
  )

export const usePowerUpCollision = ({
  animationsPaused = false,
  enabled,
  onCollect,
  powerUpRef,
}: UsePowerUpCollisionOptions) => {
  useEffect(() => {
    if (!enabled || animationsPaused) return

    let frame: number

    const tick = () => {
      const player = getPlayerElement()
      const powerUp = powerUpRef.current

      if (player && powerUp) {
        const playerRect = getInsetRect(player.getBoundingClientRect())
        const powerUpRect = getInsetRect(powerUp.getBoundingClientRect())

        if (intersects(playerRect, powerUpRect)) {
          onCollect()
          return
        }
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animationsPaused, enabled, onCollect, powerUpRef])
}
