import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type Props = {}

const Sky: FC<Props> = ({}: Props) => {
  return (
    <Box
      as={motion.div}
      position={'fixed'}
      top={0}
      left={0}
      w={'full'}
      minW={'full'}
      minH={'100vh'}
      backgroundSize={'200% 200%'}
      backgroundImage={'linear-gradient(-135deg, #0987a0 0%, #3182ce 50%, #2c5282 100%)'}
      initial={{ backgroundPosition: '0% 50%' }}
      // animate={{
      //   backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      //   transition: {
      //     type: 'keyframes',
      //     delay: 0,
      //     duration: 15,
      //     ease: 'linear',
      //     repeat: Infinity,
      //     repeatType: 'loop',
      //     repeatDelay: 0,
      //   },
      // }}
    />
  )
}

export default Sky
