'use client'

import { VStack } from '@chakra-ui/react'

import type { PlayerCharacter } from '@/lib/store'

import Mario from './mario'
import Pause from './pause'
import Stats from './stats'

export type PlayerProps = {
  character: PlayerCharacter
  complete: boolean
  down: boolean
  dying: boolean
  forwards: boolean
  jump: boolean
  length: number
  lives: number
  mario: 1 | 2 | 3
  maxXOffset: number
  mobile: boolean | undefined
  marioZIndex?: number
  paused: boolean
  score: number
  timer: number
  x: number
  xOffset: number
  xPos: number
  y: number
  yPos: number
  setPaused: (status: boolean) => void
  setX: (status: number) => void
  setY: (status: number) => void
}

const Player = ({
  character,
  complete,
  down,
  dying,
  forwards,
  jump,
  length,
  lives,
  mario,
  maxXOffset,
  mobile,
  marioZIndex = 9,
  paused,
  score,
  timer,
  x,
  xOffset,
  xPos,
  y,
  yPos,
  setPaused,
  setX,
  setY,
}: PlayerProps) => {
  return (
    <>
      {xPos < length && (
        <>
          <Mario
            character={character}
            down={down}
            dying={dying}
            variant={mario}
            x={x}
            y={y}
            xPos={xPos}
            forwards={forwards}
            jump={jump}
            zIndex={marioZIndex}
          />
        </>
      )}

      <VStack>
        {!mobile && xPos < length - xOffset && (
          <Stats
            xPos={xPos}
            yPos={yPos}
            lives={lives}
            score={score}
            timer={timer}
            complete={complete}
          />
        )}

        <Pause
          length={length - maxXOffset - xOffset}
          open={paused}
          setOpen={setPaused}
          setX={setX}
          setY={setY}
        />
      </VStack>
    </>
  )
}

export default Player
