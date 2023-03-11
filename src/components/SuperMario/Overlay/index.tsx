import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import About from './About'
import Dog from './Dog'
import End from './End'
import Intro from './Intro'
import Pipe from '../Foreground/Pipe'
import ScrollIndicator from './ScrollIndicator'
import Skills from './Skills'
import Thanks from './Thanks'

type Props = {
  xPos: number
  ip: string
}

const Overlay: FC<Props> = ({ xPos, ip }: Props) => {
  return (
    <>
      <ScrollIndicator xPos={xPos} />

      <Intro xPos={xPos} xMin={0} xMax={2620} ip={ip} />

      <About xPos={xPos} xMin={3040} xMax={7000} variant={xPos < 5100 ? 1 : 2} />

      <Skills xPos={xPos} xMin={7240} xMax={9800} offset={8360} />

      <Thanks xPos={xPos} xMin={10000} xMax={12000} offset={10680} />

      <Dog xPos={xPos} xMin={11800} xMax={16000} offset={12780} />

      <Box zIndex={9992} position={'absolute'} left={13080} bottom={'64px'} w={'410px'} h={'160px'}>
        <Pipe x={0} y={0} height={410} rotate={-90} />
      </Box>

      <End x={13360} />
    </>
  )
}

export default Overlay
