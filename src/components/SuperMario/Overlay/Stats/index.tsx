import { FC } from 'react'
import { Box, Stat, StatGroup, StatNumber, VStack } from '@chakra-ui/react'
import config from '@/utilities/config'

type Props = {
  xPos: number
  yPos: number
  lives: number
  score: number
  timer: number
}

const Stats: FC<Props> = ({ xPos, yPos, lives, score, timer }: Props) => {
  return (
    <Box
      p={2}
      zIndex={990}
      position={'fixed'}
      top={2}
      right={2}
      className={'animate__animated animate__slow animate__fadeInLeftBig'}>
      <VStack spacing={0}>
        <StatGroup
          width={{ base: '140px', md: '200px' }}
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
            <StatNumber fontSize={{ base: 'lg', md: '2xl' }} title={'Timer'}>
              {timer}
            </StatNumber>
          </Stat>
        </StatGroup>

        <StatGroup
          width={{ base: '140px', md: '200px' }}
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
              {[...Array(6 - score.toString().length)].map(() => 0)}
              {score}
            </StatNumber>
          </Stat>
        </StatGroup>

        {config.app.environment === 'development' && (
          <StatGroup
            width={{ base: '160px', md: '200px' }}
            alignItems={'center'}
            justifyContent={'space-between'}
            bg={'black'}
            px={4}>
            <Stat textAlign={'left'}>
              <StatNumber fontSize={'lg'} title={'X'}>
                x: {xPos}
              </StatNumber>
            </Stat>
            <Stat textAlign={'right'}>
              <StatNumber fontSize={'lg'} title={'Y'}>
                y: {yPos}
              </StatNumber>
            </Stat>
          </StatGroup>
        )}
      </VStack>
    </Box>
  )
}

export default Stats
