import { FC, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
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
    audio,
    ceilingLevels,
    complete,
    gameOver,
    groundLevels,
    length,
    lives,
    mario,
    marioOffset,
    maxXOffset,
    maxYOffset,
    mobile,
    paused,
    platformLevels,
    score,
    timer,
    setAudio,
    setComplete,
    setGameOver,
    setLives,
    setMario,
    setPaused,
    setScore,
  } = useSettings()

  const { forwards, jump, maxYScroll, x, y, xOffset, yOffset } = useController({
    active: !complete && !gameOver && !paused,
    audio: audio,
    mario: mario,
    maximum: {
      length: length,
      xOffset: maxXOffset,
      yOffset: maxYOffset,
      marioOffset: marioOffset,
    },
    mobile: mobile,
    position: {
      x: 0,
      y: 64,
      xOffset: 0,
      yOffset: 0,
      ceilingLevels: ceilingLevels,
      groundLevels: groundLevels,
      platformLevels: platformLevels,
    },
    speed: {
      x: 16,
      y: 16,
    },
  })

  // Complete
  useEffect(() => {
    if (!complete && x >= length - xOffset) {
      setComplete(true)

      if (audio > 0) {
        const sound = new Audio('/audio/clear/clear.mp3')
        sound.volume = audio / 100
        sound.play()
      }
    }
  }, [audio, complete, length, x, xOffset, setComplete])

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
          xPos={x + xOffset}
          yPos={y + yOffset}
          jump={jump}
          mario={mario}
          marioOffset={marioOffset}
          setMario={setMario}
          score={score}
          setScore={setScore}
          audio={audio}
        />
        <Player
          xPos={x + xOffset}
          yPos={y + yOffset}
          xOffset={xOffset}
          x={xOffset}
          y={y + yOffset}
          mobile={mobile}
          forwards={forwards}
          jump={jump}
          length={length}
          mario={mario}
          paused={paused}
          setPaused={setPaused}
          lives={lives}
          score={score}
          timer={timer}
          audio={audio}
          setAudio={setAudio}
          complete={complete}
        />
        <Overlay
          xPos={x + xOffset}
          yPos={y + yOffset}
          xOffset={xOffset}
          forwards={forwards}
          length={length}
          audio={audio}
          ip={ip}
        />
      </Box>
    </Box>
  )
}

export default SuperMario
