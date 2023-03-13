import { FC, useEffect, useState } from 'react'
import { Box, useEventListener, useMediaQuery } from '@chakra-ui/react'
import { useScroll } from 'framer-motion'
import { useWindowSize } from '@/hooks/useWindowSize'
import config from '@/utilities/config'
import { useStore } from '@/utilities/store'
import Environment from './Environment'
import Landscape from './Landscape'
import Foreground from './Foreground'
import Player from './Player'
import Overlay from './Overlay'
import { platforms, PlatformUpdate } from './platforms'
import { positions, PositionUpdate } from './positions'

export type SuperMarioProps = {
  ip: string
}

const SuperMario: FC<SuperMarioProps> = ({ ip }: SuperMarioProps) => {
  const [store, updateStore] = useStore()
  const { width, height } = useWindowSize()
  const [mobile] = useMediaQuery('(max-width: 48rem)')
  const [paused, setPaused] = useState(false)
  const [audioLevel, setAudioLevel] = useState(store.audioLevel || 0)
  const [lives] = useState(1)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(300)
  const [complete, setComplete] = useState(false)

  const { scrollY } = useScroll()
  const [x, setX] = useState(0)
  const [y, setY] = useState(64)
  const [xSpeed, setXSpeed] = useState(12)
  const [ySpeed] = useState(16)
  const [oldX, setOldX] = useState(0)
  const [xOffset, setXOffset] = useState(80)
  const [yOffset, setYOffset] = useState(0)
  const [jumpOffset, setJumpOffset] = useState(240)
  const [walkOffset] = useState(0)

  const length = 13360
  const [maxScroll, setMaxScroll] = useState(length + height - xOffset - 24)

  const [marioVariant, setMarioVariant] = useState<1 | 2>(1)
  const [forwards, setForwards] = useState(true)
  const [moving, setMoving] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [jump, setJump] = useState(false)
  const [jumping, setJumping] = useState(false)
  const [jumpLock, setJumpLock] = useState(false)
  const [platform, setPlatform] = useState(false)

  // Audio
  useEffect(() => {
    updateStore({ type: 'FETCH_AUDIO_LEVEL' })
    setAudioLevel(store.audioLevel)
  }, [setAudioLevel, store.audioLevel, updateStore])

  // Resize
  useEffect(() => {
    if (maxScroll !== length + height - xOffset - 24) {
      setMaxScroll(length + height - xOffset - 24)
    }
  }, [height, length, maxScroll, xOffset])

  // Timer
  useEffect(() => {
    if (!paused && !complete && timer > 0) {
      const timeout = setTimeout(() => !paused && setTimer(timer - 1), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
    return () => {}
  }, [complete, , paused, timer])

  // Pause
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

  // Complete
  useEffect(() => {
    if (!complete && x >= length - xOffset) {
      setComplete(true)

      if (audioLevel > 0) {
        const sound = new Audio('/audio/clear/clear.mp3')
        sound.volume = audioLevel / 100
        sound.play()
      }
    }
  }, [audioLevel, complete, length, x, xOffset])

  // Jump
  useEffect(() => {
    if (!mobile && jump) {
      if (!jumping) {
        setJumping(true)
        if (audioLevel > 0) {
          const sound = new Audio('/audio/jump/jump.mp3')
          sound.volume = audioLevel / 100
          sound.play()
        }
      }

      setTimeout(
        () => {
          setJump(false)
          setJumping(false)
          setJumpOffset(240)
        },
        config.app.environment === 'development' ? 1800 : 600,
      )
    }
  }, [x, y, xOffset, audioLevel, jump, jumping, mobile, setJump, setJumping])

  // Key Down Event
  useEventListener('keydown', (event) => {
    if (!mobile) {
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
          setPaused(true)

          if (audioLevel > 0) {
            const sound = new Audio('/audio/pause/pause.mp3')
            sound.volume = audioLevel / 100
            sound.play()
          }
        }
      }
    }
  })

  // Key Up Event
  useEventListener('keyup', (event) => {
    if (!mobile) {
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
  })

  // Scroll Event
  useEffect(() => {
    return scrollY.on('change', () => {
      if (!complete) {
        let val = scrollY.get()
        let newPos = val <= maxScroll ? val : maxScroll

        setForwards(val - oldX > 0 ? true : false)
        setOldX(val)

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
    })
  }, [complete, forwards, maxScroll, oldX, scrollY, x])

  // Control Movements
  useEffect(() => {
    if (!complete && !paused && x + xOffset <= maxScroll) {
      // move
      if (!mobile) {
        if (!moveRight && !moveLeft) {
          // stop moving
          if (xSpeed !== 0) {
            setXSpeed(0)
          }
        } else {
          // automatic speed
          if (xSpeed !== 16) {
            setXSpeed(16)
          }

          // move left and right
          if (moveRight && x + xSpeed < maxScroll) {
            setOldX(x)
            if (xOffset < walkOffset) {
              setXOffset(xOffset + xSpeed)
            } else {
              setX(x + xSpeed)
            }
          } else if (moveLeft && x + xSpeed < maxScroll) {
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
      }

      // jump
      if (jump) {
        if (yOffset + ySpeed < jumpOffset) {
          setYOffset(yOffset + ySpeed)
        } else if (yOffset !== jumpOffset) {
          setYOffset(jumpOffset)
        }
      } else {
        // descend
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
        PositionUpdate({
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
  }, [
    mobile,
    paused,
    complete,
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
    maxScroll,
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
    <Box overflowY={'scroll'} overflowX={'hidden'} h={maxScroll + 'px'} w={'100vw'}>
      <Environment mobile={mobile} />
      <Box
        zIndex={1}
        position={'fixed'}
        left={0}
        bottom={0}
        h={'100vh'}
        w={'100vw'}
        ml={'-' + x + 'px'}
        transition={'marginLeft .1s ease-in-out'}>
        <Landscape />
        <Foreground
          xPos={x + xOffset}
          yPos={y + yOffset}
          jump={jump}
          setJumpOffset={setJumpOffset}
          marioVariant={marioVariant}
          setMarioVariant={setMarioVariant}
          score={score}
          setScore={setScore}
          audioLevel={audioLevel}
        />
        <Player
          x={xOffset}
          y={y + yOffset}
          mobile={mobile}
          forwards={forwards}
          jump={jump}
          xPos={x + xOffset}
          setXPos={setX}
          yPos={y + yOffset}
          setYPos={setY}
          length={length}
          maxScroll={maxScroll}
          marioVariant={marioVariant}
          paused={paused}
          setPaused={setPaused}
          lives={lives}
          score={score}
          timer={timer}
          audioLevel={audioLevel}
          setAudioLevel={setAudioLevel}
          complete={complete}
        />
        <Overlay
          xPos={x + xOffset}
          yPos={y + yOffset}
          forwards={forwards}
          audioLevel={audioLevel}
          length={length}
          xOffset={xOffset}
          ip={ip}
        />
      </Box>
    </Box>
  )
}

export default SuperMario
