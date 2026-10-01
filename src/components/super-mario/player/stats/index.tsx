'use client'

import { Flex, Stat, VStack } from '@chakra-ui/react'

import { MotionBox } from '@/components/motion'
import { config } from '@/lib/config'

export type StatsProps = {
  xPos: number
  yPos: number
  lives: number
  score: number
  timer: number
  complete: boolean
}

const Stats = ({ xPos, yPos, lives, score, timer, complete }: StatsProps) => {
  return (
    <MotionBox
      zIndex={15}
      position={'fixed'}
      top={2}
      right={2}
      px={4}
      py={2}
      bg={'black'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      initial={{ translateX: '150%' }}
      animate={{ translateX: 0, transition: { delay: 1 } }}
    >
      <VStack gap={0} w={{ base: '160px', md: '200px' }}>
        <Flex w={'full'} alignItems={'center'} justifyContent={'space-between'}>
          <Stat.Root textAlign={'left'}>
            <Stat.ValueText fontSize={{ base: 'lg', md: '2xl' }} title={'Level'}>
              World 1-1
            </Stat.ValueText>
          </Stat.Root>
          <Stat.Root textAlign={'right'} alignItems={'flex-end'}>
            <Stat.ValueText
              fontSize={{ base: 'lg', md: '2xl' }}
              title={'Timer'}
              {...((complete && { color: 'green.500' }) || (timer < 61 && { color: 'red.500' }))}
            >
              {timer}
            </Stat.ValueText>
          </Stat.Root>
        </Flex>

        <Flex w={'full'} alignItems={'center'} justifyContent={'space-between'}>
          <Stat.Root textAlign={'left'}>
            <Stat.ValueText fontSize={{ base: 'lg', md: '2xl' }} title={'Lives'}>
              M x {lives}
            </Stat.ValueText>
          </Stat.Root>
          <Stat.Root textAlign={'right'} alignItems={'flex-end'}>
            <Stat.ValueText fontSize={{ base: 'lg', md: '2xl' }} title={'Score'}>
              {String(score).padStart(6, '0')}
            </Stat.ValueText>
          </Stat.Root>
        </Flex>

        {config.app.environment === 'development' && (
          <Flex w={'full'} alignItems={'center'} justifyContent={'space-between'}>
            <Stat.Root textAlign={'left'}>
              <Stat.ValueText fontSize={'lg'} title={'X'}>
                x: {Math.round(xPos)}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root textAlign={'right'} alignItems={'flex-end'}>
              <Stat.ValueText fontSize={'lg'} title={'Y'}>
                y: {Math.round(yPos)}
              </Stat.ValueText>
            </Stat.Root>
          </Flex>
        )}
      </VStack>
    </MotionBox>
  )
}

export default Stats
