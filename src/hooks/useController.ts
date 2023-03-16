import { useCallback, useEffect, useState } from 'react'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useScroll } from '@/hooks/useScroll'
import { useWindow } from '@/hooks/useWindow'

type ControllerProps = {
  active: boolean
  audio: number
  mario: 1 | 2
  maximum: {
    length: number
    xOffset: number
    yOffset: number
    marioOffset: number
  }
  mobile: boolean
  position: {
    x: number
    y: number
    xOffset: number
    yOffset: number
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
  }
  speed: {
    x: number
    y: number
  }
}

export const useController = ({
  active,
  audio,
  mario,
  mobile,
  maximum,
  position,
  speed,
}: ControllerProps) => {
  const { height } = useWindow()
  const { up, left, right, escape } = useKeyboard({ active: active })
  const { yScroll } = useScroll({ active: active })
  const [forwards, setForwards] = useState(true)
  const [jump, setJump] = useState(false)
  const [jumpLock, setJumpLock] = useState(false)
  const [x, setX] = useState(position.x)
  const [y, setY] = useState(position.y)
  const [xOffset, setXOffset] = useState(position.xOffset)
  const [yOffset, setYOffset] = useState(position.yOffset)
  const [maxYScroll, setMaxYScroll] = useState(length + height - xOffset - 24)
  const [lastYScroll, setLastYScroll] = useState(yScroll)

  // Adjust Y Positioning
  const updateY = useCallback(() => {
    if (active) {
      if (jump) {
        // Ceiling levels
        for (let i of position.ceilingLevels) {
          if (
            x + xOffset > i.xMin &&
            x + xOffset < i.xMax &&
            y <= i.height &&
            y + yOffset >= i.height - (mario !== 1 ? maximum.marioOffset : 0)
          ) {
            if (!jumpLock) setJumpLock(true)
            return true
          }
        }
        // Ascend
        if (yOffset < maximum.yOffset) {
          setYOffset(yOffset + speed.y <= maximum.yOffset ? yOffset + speed.y : maximum.yOffset)
        }
      } else {
        // Descend
        if (yOffset > 0) {
          setYOffset(yOffset - speed.y >= 0 ? yOffset - speed.y : 0)
        }
        // Platform levels
        if (!mobile) {
          for (let i of position.platformLevels) {
            if (y + yOffset >= i.height && x + xOffset > i.xMin && x + xOffset < i.xMax) {
              if (y !== i.height) {
                setY(i.height)
                setYOffset(y + yOffset - i.height > 0 ? y + yOffset - i.height : 0)
              }
              return true
            }
          }
        }
        // Ground levels
        for (let i of position.groundLevels) {
          if (x + xOffset > i.xMin && x + xOffset < i.xMax) {
            if (y !== i.height) {
              setYOffset(y + yOffset - i.height > 0 ? y + yOffset - i.height : 0)
              setY(i.height)
            }
            return true
          }
        }
      }
    }
    return false
  }, [
    active,
    jump,
    jumpLock,
    mario,
    maximum.marioOffset,
    maximum.yOffset,
    mobile,
    position.ceilingLevels,
    position.groundLevels,
    position.platformLevels,
    speed.y,
    x,
    xOffset,
    y,
    yOffset,
  ])

  // Resize
  useEffect(() => {
    if (maxYScroll !== maximum.length + height - xOffset - 24) {
      setMaxYScroll(maximum.length + height - xOffset - 24)
    }
  }, [height, maximum.length, maxYScroll, xOffset])

  // Jump
  useEffect(() => {
    if (active && !mobile) {
      if (up && !jumpLock && yOffset < maximum.yOffset) {
        if (!jump) {
          setJump(true)
          if (audio > 0) {
            const sound = new Audio('/audio/jump/jump.mp3')
            sound.volume = audio / 100
            sound.play()
          }
        }
        updateY()
      } else {
        if (jump) setJump(false)
        if (yOffset > 0) {
          if (!jumpLock) setJumpLock(true)
          updateY()
        } else {
          if (jumpLock && !up) setJumpLock(false)
        }
      }
    }
  }, [active, audio, jump, jumpLock, maximum.yOffset, mobile, speed.y, up, updateY, yOffset])

  // Left
  useEffect(() => {
    if (active && !mobile && !right && left && x >= 0) {
      if (x === 0 && xOffset > 0) {
        setXOffset(xOffset - speed.x >= 0 ? xOffset - speed.x : 0)
      } else {
        setX(x - speed.x >= 0 ? x - speed.x : 0)
      }
      if (forwards) setForwards(false)
      updateY()
    }
  }, [active, left, right, forwards, mobile, speed.x, updateY, x, xOffset])

  // Right
  useEffect(() => {
    if (active && !mobile && !left && right && x <= maximum.length - xOffset) {
      if (xOffset < maximum.xOffset) {
        setXOffset(xOffset + speed.x <= maximum.xOffset ? xOffset + speed.x : maximum.xOffset)
      } else {
        setX(x + speed.x <= maximum.length - xOffset ? x + speed.x : maximum.length - xOffset)
      }
      if (!forwards) setForwards(true)
      updateY()
    }
  }, [
    active,
    left,
    right,
    forwards,
    maximum.length,
    maximum.xOffset,
    mobile,
    speed.x,
    updateY,
    x,
    xOffset,
  ])

  // Scroll
  useEffect(() => {
    if (active && !left && !right && lastYScroll !== yScroll && x !== yScroll) {
      if (yScroll > x) {
        // right
        if (xOffset < maximum.xOffset) {
          setXOffset(yScroll <= maximum.xOffset ? yScroll : maximum.xOffset)
        } else {
          setX(yScroll <= maximum.length - xOffset ? yScroll : maximum.length - xOffset)
        }
        if (!forwards) setForwards(true)
      } else {
        // left
        setX(yScroll >= 0 ? yScroll : 0)
        if (forwards) setForwards(false)
      }
      setLastYScroll(yScroll)
      updateY()
    }
  }, [
    active,
    left,
    right,
    forwards,
    lastYScroll,
    maximum.length,
    maximum.xOffset,
    updateY,
    yScroll,
    x,
    xOffset,
  ])

  return { forwards, jump, x, y, maxYScroll, xOffset, yOffset }
}
