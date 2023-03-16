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
  xOffset: number
  length: number
  jump: boolean
  mario: 1 | 2
  paused: boolean
  lives: number
  score: number
  timer: number
  audio: number
  complete: boolean
  setAudio: (status: number) => void
  setPaused: (status: boolean) => void
}

const Player: FC<PlayerProps> = ({
  x,
  y,
  mobile,
  forwards,
  xPos,
  yPos,
  xOffset,
  length,
  jump,
  mario,
  paused,
  lives,
  score,
  timer,
  audio,
  complete,
  setAudio,
  setPaused,
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
        open={paused}
        setOpen={setPaused}
        audio={audio}
        setAudio={setAudio}
        length={length}
        xOffset={xOffset}
      />
    </>
  )
}

export default Player
