import { FC } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Code from '@/components/Code'

type Props = {
  xPos: number
  xMin: number
  xMax: number
  offset: number
}

const Thanks: FC<Props> = ({ xPos, xMin, xMax, offset }: Props) => {
  return (
    <Box
      as={motion.div}
      zIndex={999}
      position={'fixed'}
      top={12}
      left={8}
      maxW={'calc(100vw - 2rem)'}
      py={3}
      ml={(offset - xPos > 0 ? offset - xPos : 0) + 'px'}
      visibility={xPos < 2000 ? 'hidden' : 'visible'}
      {...((xPos > xMin &&
        xPos < xMax && {
          initial: { opacity: 0, marginTop: -600 },
          animate: { opacity: 1, marginTop: 0 },
        }) || {
        initial: { opacity: 1, marginTop: 0 },
        animate: { opacity: 0, marginTop: -600 },
      })}>
      <Code text={'<h1>'} />
      <Heading
        size={{ base: '2xl', md: '4xl' }}
        fontSize={{ base: '76px', md: '100px' }}
        color={'white'}
        textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
        pb={2}>
        THANKS FOR
        <br />
        STOPPING BY!
      </Heading>
      <Code text={'</h1>'} />
    </Box>
  )
}

export default Thanks
