import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import Bush from './Bush'
import Ground from './Ground'
import Tree from './Tree'

type Props = {}

const Landscape: FC<Props> = ({}: Props) => {
  return (
    <Box zIndex={99} position={'absolute'} left={0} bottom={0} w={'full'} h={'full'}>
      <Ground x={0} height={64} width={3374} />
      <Ground x={3360} height={128} width={2320} />
      <Ground x={5920} height={64} width={1760} />
      <Ground x={7840} height={64} width={400} />
      <Ground x={8480} height={64} width={3000} />
      <Ground x={11560} height={64} width={1800} />

      <Tree variant={2} x={320} y={64} />

      <Bush x={1040} y={64} />
      <Bush x={1120} y={64} />
      <Bush x={1200} y={64} />

      <Bush x={3600} y={128} />
      <Bush x={3680} y={128} />
      <Bush x={3760} y={128} />
      <Bush x={3840} y={128} />
      <Bush x={3920} y={128} />
      <Bush x={4000} y={128} />

      <Tree variant={2} x={4320} y={128} />

      <Tree variant={1} x={4960} y={128} />

      <Bush x={5440} y={128} />
      <Bush x={5520} y={128} />

      <Bush x={6080} y={64} />
      <Bush x={6160} y={64} />
      <Bush x={6240} y={64} />

      <Bush x={8800} y={64} />
      <Bush x={8880} y={64} />
      <Bush x={8960} y={64} />

      <Tree variant={1} x={9680} y={64} />

      <Tree variant={3} x={12120} y={64} />
    </Box>
  )
}

export default Landscape
