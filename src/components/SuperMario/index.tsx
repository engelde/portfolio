import { FC, KeyboardEvent, useEffect, useState } from 'react'
import { Box, useMediaQuery } from '@chakra-ui/react'
import Background from './Background'
import Environment from './Environment'
import Landscape from './Landscape'
import Foreground from './Foreground'
import Overlay from './Overlay'
import config from '@/utilities/config'
import { platforms, PlatformUpdate } from './platforms'
import { positions, PositionUpdate } from './positions'

const SuperMario: FC = () => {
  const [mobile] = useMediaQuery('(max-width: 48rem)')
  const [paused, setPaused] = useState(false)

  const [lives] = useState(3)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(300)

  const [walkOffset] = useState(0)
  const [jumpOffset, setJumpOffset] = useState(240)
  const length = 13360
  const [maxX] = useState(length + window.innerHeight)

  const [x, setX] = useState(0)
  const [y, setY] = useState(64)

  const [xOffset, setXOffset] = useState(32)
  const [yOffset, setYOffset] = useState(0)

  const [oldX, setOldX] = useState(0)

  const [xSpeed, setXSpeed] = useState(12)
  const [ySpeed] = useState(16)

  const [forwards, setForwards] = useState(true)
  const [moving, setMoving] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)

  const [jump, setJump] = useState(false)
  const [jumpLock, setJumpLock] = useState(false)
  const [duck, setDuck] = useState(false)
  const [duckLock, setDuckLock] = useState(false)

  const [platform, setPlatform] = useState(false)

  // Timer
  useEffect(() => {
    if (!mobile) {
      if (timer > 0) {
        setTimeout(() => {
          setTimer(timer - 1)
        }, 1000)
      }
    }
  }, [setTimer, timer, mobile])

  // Puase
  useEffect(() => {
    if (paused && moveLeft) {
      if (moving) {
        setMoveLeft(false)
        setMoving(false)
      }
    }
    if (paused && moveRight) {
      if (moving) {
        setMoveRight(false)
        setMoving(false)
      }
    }
  }, [paused, moveLeft, setMoveLeft, moveRight, setMoveRight, moving, setMoving])

  // Jump
  useEffect(() => {
    if (!mobile && jump) {
      setTimeout(
        () => {
          setJump(false)
          setJumpOffset(240)
        },
        config.app.environment === 'development' ? 800 : 400,
      )
    }
  }, [x, y, xOffset, jump, mobile, setJump])

  // Input
  useEffect(() => {
    const handleMove = (event: KeyboardEvent) => {
      if (event.code === 'ArrowRight') {
        event.preventDefault()
        if (!moveRight && !moveLeft && !paused) {
          setMoving(true)
          setMoveRight(true)
          setMoveLeft(false)
          setForwards(true)
        }
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault()
        if (!moveLeft && !moveRight && !paused) {
          setMoving(true)
          setMoveRight(false)
          setMoveLeft(true)
          setForwards(false)
        }
      }

      if (event.code === 'ArrowUp' || event.code === 'Space') {
        event.preventDefault()
        if (!jumpLock && !jump && !paused) {
          setJump(true)
          setJumpLock(true)
        }
      } else if (event.code === 'ArrowDown') {
        event.preventDefault()
      }

      if (event.code === 'Escape') {
        event.preventDefault()
        if (!paused) {
          setPaused(!paused)
        }
      }
    }

    // Move End
    const handleMoveEnd = (event: KeyboardEvent) => {
      if (event.code === 'ArrowRight') {
        event.preventDefault()
        if (moveRight && !moveLeft && !paused) {
          setMoveRight(false)
          setMoving(false)
        }
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault()
        if (moveLeft && !moveRight && !paused) {
          setMoveLeft(false)
          setMoving(false)
        }
      }

      if ((event.code === 'ArrowUp' || event.code === 'Space') && !paused) {
        event.preventDefault()
        if (!paused) {
          setJump(false)
          if (jumpLock) {
            setTimeout(() => {
              setJumpLock(false)
            }, 200)
          }
        }
      } else if (event.code === 'ArrowDown') {
        event.preventDefault()
      }
    }

    // Move on scroll
    const handleScroll = () => {
      setForwards(window.scrollY - oldX > 0 ? true : false)
      setOldX(window.scrollY)

      let newPos = window.scrollY < maxX ? window.scrollY : maxX

      if (forwards) {
        if (x != newPos) {
          setX(newPos)
        }
      } else {
        if (x > 0 && x != newPos) {
          setX(newPos)
        }
      }
    }

    if (!mobile) {
      // @ts-ignore
      window.addEventListener('keydown', handleMove)
      // @ts-ignore
      window.addEventListener('keyup', handleMoveEnd)
    }
    // @ts-ignore
    window.addEventListener('scroll', handleScroll)

    return () => {
      if (!mobile) {
        // @ts-ignore
        window.removeEventListener('keydown', handleMove)
        // @ts-ignore
        window.removeEventListener('keyup', handleMoveEnd)
      }
      // @ts-ignore
      window.removeEventListener('scroll', handleScroll)
    }
  }, [
    jump,
    jumpLock,
    forwards,
    length,
    paused,
    moveRight,
    moveLeft,
    oldX,
    maxX,
    mobile,
    x,
    xOffset,
    setJump,
    setJumpLock,
    walkOffset,
  ])

  // Control Movements
  useEffect(() => {
    if (!paused) {
      if (x + xOffset < length) {
        // move
        if (!mobile && !moveRight && !moveLeft) {
          // stop moving
          if (xSpeed !== 0) {
            setXSpeed(0)
          }
        } else if (!mobile) {
          // automatic speed
          if (xSpeed !== 16) {
            setXSpeed(16)
          }

          // move left and right
          if (moveRight && x + xSpeed < maxX) {
            setOldX(x)
            if (xOffset < walkOffset) {
              setXOffset(xOffset + xSpeed)
            } else {
              setX(x + xSpeed)
            }
          } else if (moveLeft && x + xSpeed < maxX) {
            setOldX(x)
            if (x > 0) {
              setX(x - xSpeed)
            } else if (xOffset - xSpeed < walkOffset) {
              if (xOffset > 0) {
                setXOffset(xOffset - xSpeed)
              }
            }
          }
        }

        // jump
        if (jump) {
          if (yOffset + ySpeed < jumpOffset) {
            setYOffset(yOffset + ySpeed)
          } else if (yOffset !== jumpOffset) {
            setYOffset(jumpOffset)
          }
        }

        // descend
        else {
          if (yOffset !== 0) {
            setYOffset(yOffset - ySpeed > 0 ? yOffset - ySpeed : 0)
          }
        }

        // platform updates
        !mobile &&
          setPlatform(
            PlatformUpdate({
              xPos: x,
              yPos: y,
              xOffset: xOffset,
              yOffset: yOffset,
              setY: setY,
              setYOffset: setYOffset,
              ySpeed: ySpeed,
              platforms: platforms,
            }),
          )

        // automatic y updates
        if (!jump && !platform) {
          const positionUpdate = PositionUpdate({
            xPos: x,
            yPos: y,
            xOffset: xOffset,
            yOffset: yOffset,
            setY: setY,
            setYOffset: setYOffset,
            positions: positions,
          })
        }
      }
    }
  }, [
    mobile,
    paused,
    length,
    jumpOffset,
    walkOffset,
    moveRight,
    moveLeft,
    jump,
    x,
    setX,
    y,
    setY,
    maxX,
    xOffset,
    setXOffset,
    yOffset,
    xSpeed,
    setXSpeed,
    ySpeed,
    platform,
    setPlatform,
  ])

  return (
    <Box overflowY={'scroll'} overflowX={'hidden'} h={maxX + 'px'} w={'100vw'}>
      <Background />
      <Environment />
      <Box
        zIndex={1}
        position={'fixed'}
        left={'0px'}
        transition={'marginLeft .1s ease-in-out'}
        ml={'-' + x + 'px'}
        bottom={0}
        h={'100vh'}
        w={'100vw'}>
        <Landscape length={length} xPos={x + xOffset} yPos={y + yOffset} />
        <Foreground
          xPos={x + xOffset}
          yPos={y + yOffset}
          jump={jump}
          setJumpOffset={setJumpOffset}
          score={score}
          setScore={setScore}
        />
        <Overlay
          x={xOffset}
          y={y + yOffset}
          forwards={forwards}
          length={length}
          moving={moving}
          jump={jump}
          xPos={x + xOffset}
          setXPos={setX}
          yPos={y + yOffset}
          setYPos={setY}
          paused={paused}
          lives={lives}
          score={score}
          timer={timer}
          setPaused={setPaused}
        />
      </Box>
    </Box>
  )
}

export default SuperMario
