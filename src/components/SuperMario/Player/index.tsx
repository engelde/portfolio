import { FC } from 'react'
import Mario from './Mario'
import Pause from './Pause'
import Stats from './Stats'

export type PlayerProps = {
  audio: number
  complete: boolean
  forwards: boolean
  jump: boolean
  length: number
  lives: number
  mario: 1 | 2
  mobile: boolean
  paused: boolean
  score: number
  timer: number
  x: number
  xOffset: number
  xPos: number
  y: number
  yPos: number
  setAudio: (status: number) => void
  setPaused: (status: boolean) => void
  setX: (status: number) => void
  setY: (status: number) => void
}

const Player: FC<PlayerProps> = ({
  audio,
  complete,
  forwards,
  jump,
  length,
  lives,
  mario,
  mobile,
  paused,
  score,
  timer,
  x,
  xOffset,
  xPos,
  y,
  yPos,
  setAudio,
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
          audio={audio}
          complete={complete}
        />
      )}

      <Pause
        audio={audio}
        length={length}
        open={paused}
        xOffset={xOffset}
        setAudio={setAudio}
        setOpen={setPaused}
        setX={setX}
        setY={setY}
      />
    </>
  )
}

export default Player
