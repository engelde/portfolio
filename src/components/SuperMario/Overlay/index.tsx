import { FC, useState, useEffect } from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import { Box as CkBox } from '@chakra-ui/react'
import Pipe from '../Foreground/Pipe'
import About from './About'
import Dog from './Dog'
import End from './End'
import Intro from './Intro'
import Mario from './Mario'
import Pause from './Pause'
import Skills from './Skills'
import Stats from './Stats'
import Thanks from './Thanks'

type Props = {
  x: number
  y: number
  forwards: boolean
  length: number
  moving: boolean
  xPos: number
  setXPos: (pos: number) => void
  yPos: number
  setYPos: (pos: number) => void
  maxX: number
  jump: boolean
  paused: boolean
  lives: number
  score: number
  timer: number
  setPaused: (status: boolean) => void
  ip: string
}

const Overlay: FC<Props> = ({
  x,
  y,
  forwards,
  moving,
  xPos,
  yPos,
  setXPos,
  setYPos,
  maxX,
  jump,
  length,
  paused,
  lives,
  score,
  timer,
  setPaused,
  ip,
}: Props) => {
  const [marioState, setMarioState] = useState('sm')
  const [mobile] = useMediaQuery('(max-width: 48rem)')

  useEffect(() => {
    // power up 1
    if (xPos >= 1700 && xPos <= 1800 && yPos >= 460 && yPos <= 540) {
      if (marioState !== 'lg') {
        setMarioState('lg')
      }
    }
  }, [xPos, yPos, marioState, setMarioState])

  return (
    <>
      <Intro
        ip={ip}
        className={
          xPos > 2720
            ? 'animate__animated animate__faster animate__slideOutUp'
            : 'animate__animated animate__fadeInDownBig'
        }
      />

      <About
        stage={xPos < 5100 ? 1 : 2}
        visibility={xPos > 1000 ? 'inherit' : 'hidden'}
        className={
          xPos < 3040 || xPos > 7000
            ? 'animate__animated animate__faster animate__slideOutUp'
            : 'animate__animated animate__fadeInDownBig'
        }
      />

      <Skills
        xPos={xPos}
        offset={8360 - xPos > 0 ? 8360 - xPos : 0}
        visibility={xPos > 1000 ? 'inherit' : 'hidden'}
        className={
          xPos < 7240 || xPos > 9800
            ? 'animate__animated animate__faster animate__slideOutUp'
            : 'animate__animated animate__fadeInDownBig'
        }
      />

      <Thanks
        xPos={xPos}
        offset={10720 - xPos > 0 ? 10720 - xPos : 0}
        visibility={xPos > 1000 ? 'inherit' : 'hidden'}
        className={
          xPos < 10040 || xPos > 12160
            ? 'animate__animated animate__faster animate__slideOutUp'
            : 'animate__animated animate__fadeInDownBig'
        }
      />

      <Dog
        xPos={xPos}
        offset={12680 - xPos > 0 ? 12680 - xPos + (12680 % xPos) / 2 : 0}
        visibility={xPos > 1000 ? 'inherit' : 'hidden'}
        className={
          xPos < 11600
            ? 'animate__animated animate__faster animate__slideOutRight'
            : 'animate__animated animate__fadeInDownBig'
        }
      />

      {xPos < 13360 && (
        <>
          <Mario
            variant={marioState}
            x={x}
            y={y}
            xPos={xPos}
            forwards={forwards}
            moving={moving}
            jump={jump}
          />
        </>
      )}

      {xPos < 13360 && !mobile && (
        <Stats xPos={xPos} yPos={yPos} lives={lives} score={score} timer={timer} />
      )}

      <CkBox
        position={'absolute'}
        zIndex={9992}
        height={'160px'}
        width={'410px'}
        left={13080}
        bottom={'64px'}>
        <Pipe x={0} y={0} height={410} rotate={-90} />
      </CkBox>

      <End x={13360} y={0} />

      <Pause open={paused} setOpen={setPaused} setXPos={setXPos} setYPos={setYPos} maxX={maxX} />
    </>
  )
}

export default Overlay
