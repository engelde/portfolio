import { FC } from 'react'
import Mario from './Mario'
import Pause from './Pause'
import Stats from './Stats'

export type PlayerProps = {
  x: number
  y: number
  mobile: boolean
  forwards: boolean
  xPos: number
  yPos: number
  length: number
  maxX: number
  jump: boolean
  marioVariant: 1 | 2
  paused: boolean
  lives: number
  score: number
  timer: number
  audioLevel: number
  complete: boolean
  setAudioLevel: (status: number) => void
  setPaused: (status: boolean) => void
  setXPos: (pos: number) => void
  setYPos: (pos: number) => void
}

const Player: FC<PlayerProps> = ({
  x,
  y,
  mobile,
  forwards,
  xPos,
  yPos,
  length,
  maxX,
  jump,
  marioVariant,
  paused,
  lives,
  score,
  timer,
  audioLevel,
  complete,
  setAudioLevel,
  setPaused,
  setXPos,
  setYPos,
}: PlayerProps) => {
  return (
    <>
      {xPos < length && (
        <>
          <Mario variant={marioVariant} x={x} y={y} xPos={xPos} forwards={forwards} jump={jump} />
        </>
      )}

      {xPos < length && !mobile && (
        <Stats
          xPos={xPos}
          yPos={yPos}
          lives={lives}
          score={score}
          timer={timer}
          audioLevel={audioLevel}
          complete={complete}
        />
      )}

      <Pause
        open={paused}
        setOpen={setPaused}
        setXPos={setXPos}
        setYPos={setYPos}
        audioLevel={audioLevel}
        setAudioLevel={setAudioLevel}
        maxX={maxX}
      />
    </>
  )
}

export default Player
