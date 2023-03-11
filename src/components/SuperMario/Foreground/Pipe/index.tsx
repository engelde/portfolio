import { FC } from 'react'
import NextImage from 'next/image'
import { VStack, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Fire from './Fire'
import Plant from './Plant'

type Props = {
  x: number
  y: number
  height: number
  rotate?: number
  plant?: boolean
  plantVariant?: 1 | 2
  forwards?: boolean
  active?: boolean
}

const Pipe: FC<Props> = ({
  x,
  y,
  height,
  rotate,
  plant,
  plantVariant,
  forwards,
  active,
}: Props) => {
  return (
    <Box
      as={motion.div}
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={'160px'}
      initial={{ translateY: '150%' }}
      animate={{ translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}>
      <VStack
        spacing={0}
        mb={rotate !== undefined ? '-' + (height / 2 - 76) + 'px' : '0px'}
        transform={'rotate(' + ((rotate !== undefined && rotate + 'deg') || '0deg') + ')'}>
        <NextImage alt={'pipe'} src={'/images/pipe/pipe.0.png'} width={160} height={80} priority />
        <Box
          w={'160px'}
          h={height - 80 + 'px'}
          bg={
            'url(/_next/image?url=%2Fimages%2Fpipe%2Fpipe.1.png&w=384&q=75) repeat-y left top / contain;'
          }
        />
      </VStack>
      {plant && (
        <>
          <Plant
            x={40}
            y={height}
            variant={plantVariant !== undefined ? plantVariant : 1}
            forwards={forwards !== undefined ? forwards : true}
          />
          {plantVariant === 2 && active && (
            <Fire x={40} y={height + 80} forwards={forwards !== undefined ? forwards : true} />
          )}
        </>
      )}
    </Box>
  )
}

export default Pipe
