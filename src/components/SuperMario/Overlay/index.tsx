import { FC, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import About from './About'
import Dog from './Dog'
import End from './End'
import Intro from './Intro'
import Pipe from '../Foreground/Pipe'
import ScrollIndicator from './ScrollIndicator'
import Skills from './Skills'
import Thanks from './Thanks'

export type OverlayProps = {
  xPos: number
  yPos: number
  forwards: boolean
  audio: number
  length: number
  xOffset: number
  ip: string
}

const Overlay: FC<OverlayProps> = ({
  xPos,
  yPos,
  forwards,
  audio,
  length,
  xOffset,
  ip,
}: OverlayProps) => {
  const [exited, setExited] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!exited && !exiting && forwards && xPos >= 12860 && xPos < 13120 && yPos <= 144) {
      setExited(true)
      setExiting(true)

      if (audio > 0) {
        const sound = new Audio('/audio/pipe/pipe.mp3')
        sound.volume = audio / 100
        sound.play()
      }

      setTimeout(() => setExiting(false), 1400)
    }

    if (exited && !exiting && xPos < 12900) {
      setExited(false)
    }
  }, [audio, exited, exiting, xPos, yPos, forwards])

  return (
    <>
      <ScrollIndicator xPos={xPos} />

      <Intro xPos={xPos} xMin={0} xMax={2620} ip={ip} />

      <About xPos={xPos} xMin={3040} xMax={7000} variant={xPos < 5100 ? 1 : 2} />

      <Skills xPos={xPos} xMin={7240} xMax={9800} offset={8360} />

      <Thanks xPos={xPos} xMin={10000} xMax={11960} offset={10680} />

      <Dog xPos={xPos} xMin={11760} xMax={16000} offset={12780} />

      <Box zIndex={10} position={'absolute'} left={13040} bottom={'64px'} w={'410px'} h={'160px'}>
        <Pipe x={0} y={0} height={410} rotate={-90} />
      </Box>

      <End x={length - xOffset} xPos={xPos} />
    </>
  )
}

export default Overlay
