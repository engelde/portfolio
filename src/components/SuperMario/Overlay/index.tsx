import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useAudio } from '@/hooks/useAudio'
import About from './About'
import Dog from './Dog'
import End from './End'
import Intro from './Intro'
import Pipe from '../Foreground/Pipe'
import ScrollIndicator from './ScrollIndicator'
import Skills from './Skills'
import Thanks from './Thanks'

export type OverlayProps = {
  ip: string
  forwards: boolean
  length: number
  xOffset: number
  xPos: number
  yPos: number
}

const Overlay: FC<OverlayProps> = ({ ip, forwards, length, xOffset, xPos, yPos }: OverlayProps) => {
  const { playAudio } = useAudio()
  const [exited, setExited] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!exited && !exiting && forwards && xPos >= 12860 && xPos < 13120 && yPos <= 144) {
      setExited(true)
      setExiting(true)
      playAudio('pipe')

      setTimeout(() => setExiting(false), 1400)
    }

    if (exited && !exiting && xPos < 12900) {
      setExited(false)
    }
  }, [exited, exiting, forwards, xPos, yPos, playAudio])

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
