import { FC, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useAudio } from '@/hooks/useAudio'
import { useController } from '@/hooks/useController'
import { useSettings } from '@/hooks/useSettings'
import Environment from './Environment'
import Foreground from './Foreground'
import Landscape from './Landscape'
import Overlay from './Overlay'
import Player from './Player'

export type SuperMarioProps = {
  ip: string
}

const SuperMario: FC<SuperMarioProps> = ({ ip }: SuperMarioProps) => {
  const {
    ceilingLevels,
    complete,
    gameOver,
    groundLevels,
    length,
    lives,
    mario,
    mobile,
    offset,
    paused,
    platformLevels,
    score,
    speed,
    timer,
    setComplete,
    setGameOver,
    setLives,
    setMario,
    setPaused,
    setScore,
  } = useSettings()

  const { forwards, jump, maxYScroll, x, y, xOffset, yOffset, setX, setY } = useController({
    active: !complete && !gameOver && !paused,
    mario: mario,
    maximum: {
      length: length,
      marioOffset: offset.mario,
      xOffset: offset.x,
      yOffset: offset.y,
    },
    mobile: mobile,
    pause: {
      paused: paused,
      setPaused: setPaused,
    },
    position: {
      ceilingLevels: ceilingLevels,
      groundLevels: groundLevels,
      platformLevels: platformLevels,
      x: 0,
      xOffset: 0,
      y: 64,
      yOffset: 0,
    },
    speed: {
      x: speed.x,
      y: speed.y,
    },
  })

  const { playAudio } = useAudio()

  // Complete
  useEffect(() => {
    if (!complete && x >= length - xOffset) {
      setComplete(true)
      playAudio('clear')
    }
  }, [complete, length, x, xOffset, playAudio, setComplete])

  // Hurry
  useEffect(() => {
    if (!complete && timer === 60) {
      playAudio('hurry')
    }
  }, [complete, timer, playAudio])

  return (
    <Box overflowY={'scroll'} overflowX={'hidden'} h={maxYScroll + 'px'} w={'100vw'}>
      <Environment mobile={mobile} />
      <Box
        zIndex={1}
        position={'fixed'}
        left={0}
        bottom={0}
        h={'100vh'}
        w={'100vw'}
        ml={'-' + x + 'px'}
        transition={'marginLeft .2s ease-in-out'}>
        <Landscape />
        <Foreground
          jump={jump}
          mario={mario}
          marioOffset={offset.mario}
          score={score}
          xPos={x + xOffset}
          yPos={y + yOffset}
          setMario={setMario}
          setScore={setScore}
        />
        <Player
          complete={complete}
          forwards={forwards}
          jump={jump}
          length={length}
          lives={lives}
          mario={mario}
          mobile={mobile}
          paused={paused}
          score={score}
          timer={timer}
          xOffset={xOffset}
          x={xOffset}
          xPos={x + xOffset}
          y={y + yOffset}
          yPos={y + yOffset}
          setPaused={setPaused}
          setX={setX}
          setY={setY}
        />
        <Overlay
          forwards={forwards}
          ip={ip}
          length={length}
          xOffset={xOffset}
          xPos={x + xOffset}
          yPos={y + yOffset}
        />
      </Box>
    </Box>
  )
}

export default SuperMario
