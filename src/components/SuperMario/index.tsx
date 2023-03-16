import { FC, useEffect } from 'react'
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

  const { forwards, jump, maxYScroll, x, y, xOffset, yOffset, setX, setY } = useController({
    active: !complete && !gameOver && !paused,
    audio: audio,
    mario: mario,
    maximum: {
      length: length,
      marioOffset: marioOffset,
      xOffset: maxXOffset,
      yOffset: maxYOffset,
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
        sound.muted = true
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
          audio={audio}
          jump={jump}
          mario={mario}
          marioOffset={marioOffset}
          score={score}
          xPos={x + xOffset}
          yPos={y + yOffset}
          setMario={setMario}
          setScore={setScore}
        />
        <Player
          audio={audio}
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
          setAudio={setAudio}
          setPaused={setPaused}
          setX={setX}
          setY={setY}
        />
        <Overlay
          audio={audio}
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
