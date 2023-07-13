import type { FC } from 'react'
import { Box, Stat, StatGroup, StatNumber, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { config } from '@/utilities/config'

export type StatsProps = {
  xPos: number
  yPos: number
  lives: number
  score: number
  timer: number
  complete: boolean
}

const Stats: FC<StatsProps> = ({ xPos, yPos, lives, score, timer, complete }: StatsProps) => {
  return (
    <Box
      as={motion.div}
      p={2}
      zIndex={15}
      position={'fixed'}
      top={2}
      right={2}
      initial={{ translateX: '150%' }}
      animate={{ translateX: 0, transition: { delay: 1 } }}>
      <VStack spacing={0}>
        <StatGroup
          w={{ base: '140px', md: '200px' }}
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={'black'}
          px={4}>
          <Stat textAlign={'left'}>
            <StatNumber fontSize={{ base: 'lg', md: '2xl' }} title={'Level'}>
              World 1
            </StatNumber>
          </Stat>
          <Stat textAlign={'right'}>
            <StatNumber
              fontSize={{ base: 'lg', md: '2xl' }}
              title={'Timer'}
              {...((complete && { color: 'green.500' }) || (timer < 61 && { color: 'red.500' }))}>
              {timer}
            </StatNumber>
          </Stat>
        </StatGroup>

        <StatGroup
          w={{ base: '140px', md: '200px' }}
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={'black'}
          px={4}>
          <Stat textAlign={'left'}>
            <StatNumber fontSize={{ base: 'lg', md: '2xl' }} title={'Lives'}>
              M x {lives}
            </StatNumber>
          </Stat>
          <Stat textAlign={'right'}>
            <StatNumber fontSize={{ base: 'lg', md: '2xl' }} title={'Score'}>
              {String(score).padStart(6, '0')}
            </StatNumber>
          </Stat>
        </StatGroup>

        {config.app.environment === 'development' && (
          <StatGroup
            w={{ base: '160px', md: '200px' }}
            alignItems={'center'}
            justifyContent={'space-between'}
            bg={'black'}
            px={4}>
            <Stat textAlign={'left'}>
              <StatNumber fontSize={'lg'} title={'X'}>
                x: {Math.round(xPos)}
              </StatNumber>
            </Stat>
            <Stat textAlign={'right'}>
              <StatNumber fontSize={'lg'} title={'Y'}>
                y: {Math.round(yPos)}
              </StatNumber>
            </Stat>
          </StatGroup>
        )}
      </VStack>
    </Box>
  )
}

export default Stats
