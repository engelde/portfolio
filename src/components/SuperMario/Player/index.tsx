import { FC, useState, useEffect } from 'react'
import Mario from './Mario'
import Pause from './Pause'
import Stats from './Stats'

type Props = {
  x: number
  y: number
  forwards: boolean
  xPos: number
  yPos: number
  maxX: number
  jump: boolean
  marioVariant: 1 | 2
  paused: boolean
  lives: number
  score: number
  timer: number
  mobile: boolean
  setPaused: (status: boolean) => void
  setXPos: (pos: number) => void
  setYPos: (pos: number) => void
}

const Overlay: FC<Props> = ({
  x,
  y,
  forwards,
  xPos,
  yPos,
  maxX,
  jump,
  marioVariant,
  paused,
  lives,
  score,
  timer,
  mobile,
  setPaused,
  setXPos,
  setYPos,
}: Props) => {
  return (
    <>
      {xPos < 13360 && (
        <>
          <Mario variant={marioVariant} x={x} y={y} xPos={xPos} forwards={forwards} jump={jump} />
        </>
      )}

      {xPos < 13360 && !mobile && (
        <Stats xPos={xPos} yPos={yPos} lives={lives} score={score} timer={timer} />
      )}

      <Pause open={paused} setOpen={setPaused} setXPos={setXPos} setYPos={setYPos} maxX={maxX} />
    </>
  )
}

export default Overlay
