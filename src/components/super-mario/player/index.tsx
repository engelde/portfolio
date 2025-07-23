'use client'

import type { FC } from 'react'
import Mario from './mario'
import Pause from './pause'
import Stats from './stats'

export type PlayerProps = {
  complete: boolean
  forwards: boolean
  jump: boolean
  length: number
  lives: number
  mario: 1 | 2 | 3
  maxXOffset: number
  mobile: boolean | undefined
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

const Player: FC<PlayerProps> = ({
  complete,
  forwards,
  jump,
  length,
  lives,
  mario,
  maxXOffset,
  mobile,
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
          <Mario variant={mario} x={x} y={y} xPos={xPos} forwards={forwards} jump={jump} />
        </>
      )}

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
    </>
  )
}

export default Player
