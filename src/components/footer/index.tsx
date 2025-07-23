import Code from '@/components/code'
import { config } from '@/lib/config'
import { Box, HStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { FC } from 'react'

export type FooterProps = {
  dark?: boolean
}

const Footer: FC<FooterProps> = ({ dark }: FooterProps) => {
  const year = new Date().getFullYear()

  return (
    <HStack
      zIndex={10}
      position={'fixed'}
      bottom={0}
      left={0}
      w={'full'}
      justifyContent={'space-between'}
      p={3}
    >
      <Box
        as={motion.div}
        initial={{ translateX: '-150%' }}
        animate={{ translateX: 0, transition: { delay: 1.5 } }}
      >
        {(dark && (
          <Code text={'© ' + year + ' ' + config.app.author + ' | v' + config.app.version} />
        )) || (
          <Text fontSize={'sm'} color={'white'} textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}>
            {'© ' + year + ' ' + config.app.author + ' | v' + config.app.version}
          </Text>
        )}
      </Box>
      <Box
        as={motion.div}
        initial={{ translateX: '150%' }}
        animate={{ translateX: 0, transition: { delay: 1.5 } }}
      >
        {(dark && <Code text={'</body>'} />) || (
          <Text fontSize={'sm'} color={'white'} textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}>
            {'</body>'}
          </Text>
        )}
      </Box>
    </HStack>
  )
}

export default Footer
