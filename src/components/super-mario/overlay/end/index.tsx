'use client'

import { Box, Flex, Heading, HStack, Link, Tooltip, VStack } from '@chakra-ui/react'
import { Fireworks } from '@fireworks-js/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import NextLink from 'next/link'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

export type EndProps = {
  complete: boolean
  x: number
  xPos: number
}

const End: FC<EndProps> = ({ complete, x, xPos }: EndProps) => {
  const [fireworks, setFireworks] = useState(false)

  useEffect(() => {
    if (complete && !fireworks) {
      setFireworks(true)
    }
  }, [complete, fireworks])

  return (
    <Box
      zIndex={20}
      position={'absolute'}
      left={x + 'px'}
      bottom={0}
      p={0}
      h={'100vh'}
      w={'100vw'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={'black'}
      _before={{
        background:
          'linear-gradient(-45deg, #000 16px, transparent 0), linear-gradient(0deg, #000 0px, transparent 0), linear-gradient(-135deg, #000 16px, transparent 0)',
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'left top',
        backgroundSize: '32px 32px',
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '-26px',
        bottom: 0,
        width: '32px',
        height: '100%',
      }}
    >
      <Flex h={'100vh'} w={'100vw'} alignItems={'center'} justifyContent={'center'}>
        <Box
          zIndex={'-1'}
          position={'absolute'}
          bottom={0}
          left={0}
          width={'100%'}
          minHeight={'100%'}
        >
          <NextImage
            alt={'clear'}
            src={'/images/clear/clear.png'}
            height={700}
            width={1028}
            draggable={false}
            priority
            style={{
              position: 'absolute',
              bottom: 64,
              left: '45%',
              margin: '0 auto',
              transform: 'translateX(-50%)',
            }}
          />

          {fireworks && (
            <Box
              position={'absolute'}
              top={0}
              left={0}
              width={'100vw'}
              height={'100vh'}
              className={'fireworks'}
            >
              <Fireworks
                options={{
                  autoresize: true,
                  opacity: 0.6,
                  acceleration: 1,
                  friction: 0.97,
                  gravity: 1.5,
                  particles: 50,
                  traceLength: 2,
                  traceSpeed: 6,
                  explosion: 7,
                  intensity: 5,
                  flickering: 50,
                  lineStyle: 'round',
                  hue: {
                    min: 0,
                    max: 360,
                  },
                  delay: {
                    min: 25,
                    max: 45,
                  },
                  rocketsPoint: {
                    min: 90,
                    max: 90,
                  },
                  lineWidth: {
                    explosion: {
                      min: 0.5,
                      max: 2,
                    },
                    trace: {
                      min: 0.5,
                      max: 1.5,
                    },
                  },
                  brightness: {
                    min: 25,
                    max: 75,
                  },
                  decay: {
                    min: 0.015,
                    max: 0.03,
                  },
                  mouse: {
                    click: false,
                    move: false,
                    max: 1,
                  },
                }}
              />
            </Box>
          )}

          <Box
            position={'absolute'}
            bottom={'60px'}
            right={'15px'}
            w={{ base: 250, md: 360 }}
            h={{ base: 294, md: 420 }}
          >
            <NextImage
              alt={'about'}
              src={'/images/castle/castle.png'}
              width={360}
              height={420}
              draggable={false}
              priority
            />
          </Box>
        </Box>

        <Box
          as={motion.div}
          alignItems={'center'}
          justifyContent={'center'}
          opacity={0}
          marginTop={'-3000px'}
          {...(xPos >= x && {
            initial: { opacity: 0, marginTop: -3000 },
            animate: { opacity: 1, marginTop: 0, transition: { duration: 0.6 } },
          })}
        >
          <VStack spacing={16}>
            <Heading
              as={motion.div}
              size={{ base: '2xl', md: '4xl' }}
              color={'white'}
              letterSpacing={'4px'}
              initial={{ scale: 1 }}
              whileInView={{
                scale: [1, 1.06, 1],
                transition: {
                  type: 'keyframes',
                  times: [0, 0.5, 1],
                  delay: 0,
                  duration: 1.6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  repeatDelay: 0,
                },
              }}
            >
              COURSE CLEAR!
            </Heading>

            <VStack spacing={0}>
              <Heading
                as={motion.div}
                size={{ base: '2xl', md: '4xl' }}
                textAlign={'center'}
                cursor={'pointer'}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                _hover={{ color: 'cyan.500' }}
                onClick={() => window.location.reload()}
              >
                {'> restart'}
              </Heading>

              <Heading
                as={motion.div}
                size={{ base: '2xl', md: '4xl' }}
                textAlign={'center'}
                cursor={'pointer'}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                _hover={{ color: 'cyan.500' }}
              >
                <Link as={NextLink} href={'https://github.com/engelde/portfolio'} target={'_blank'}>
                  {'> view source'}
                </Link>
              </Heading>
            </VStack>

            <HStack justifyContent={'center'} verticalAlign={'middle'} spacing={8}>
              <Link
                as={NextLink}
                href={'https://github.com/engelde'}
                target={'_blank'}
                referrerPolicy={'no-referrer'}
                rel={'noopener'}
              >
                <Tooltip label={'GitHub'} bg={'black'}>
                  <Box
                    as={motion.div}
                    cursor={'pointer'}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.12 }}
                  >
                    <NextImage
                      alt={'GitHub'}
                      src={'/images/github/github.png'}
                      width={49}
                      height={50}
                      draggable={false}
                      priority
                    />
                  </Box>
                </Tooltip>
              </Link>

              <Link as={NextLink} href={'https://www.linkedin.com/in/engelde'} target={'_blank'}>
                <Tooltip label={'LinkedIn'} bg={'black'}>
                  <Box
                    as={motion.div}
                    cursor={'pointer'}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.12 }}
                  >
                    <NextImage
                      alt={'LinkedIn'}
                      src={'/images/linkedin/linkedin.png'}
                      width={50}
                      height={50}
                      draggable={false}
                      priority
                    />
                  </Box>
                </Tooltip>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default End
