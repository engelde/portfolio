'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, Flex, Heading, HStack, Link, Tooltip, useMediaQuery, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Wordmark from '@/components/wordmark'

const Fireworks = dynamic(() => import('@fireworks-js/react').then((mod) => mod.Fireworks), {
  ssr: false,
})

export type EndProps = {
  active: boolean
  locked: boolean
  mode: 'course-clear' | 'game-over'
  x: number
  xPos: number
}

const End = ({ active, locked, mode, x, xPos }: EndProps) => {
  const [fireworks, setFireworks] = useState(false)
  const [mobile] = useMediaQuery('(max-width: 48rem)')
  const courseClear = mode === 'course-clear'
  const visible = active || xPos >= x

  useEffect(() => {
    if (active && courseClear && !fireworks) {
      setFireworks(true)
    }
  }, [active, courseClear, fireworks])

  useEffect(() => {
    if (courseClear && xPos > x - 1600) {
      void import('@fireworks-js/react')
    }
  }, [courseClear, x, xPos])

  return (
    <Box
      zIndex={20}
      position={'absolute'}
      left={locked ? 0 : x + 'px'}
      bottom={0}
      p={0}
      h={'100dvh'}
      minH={'100vh'}
      w={'100dvw'}
      minW={'100vw'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={'black'}
      overflow={'hidden'}
      _before={
        locked
          ? undefined
          : {
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
            }
      }
    >
      <Flex
        h={'100dvh'}
        minH={'100vh'}
        w={'100dvw'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box zIndex={0} position={'absolute'} bottom={0} left={0} width={'100%'} minHeight={'100%'}>
          <NextImage
            alt={'clear'}
            src={'/images/clear/clear.png'}
            height={700}
            width={1028}
            draggable={false}
            unoptimized
            style={{
              position: 'absolute',
              bottom: 64,
              left: '45%',
              margin: '0 auto',
              transform: 'translateX(-50%)',
            }}
          />

          {fireworks && courseClear && (
            <Box
              position={'absolute'}
              top={0}
              left={0}
              width={'100vw'}
              height={'100vh'}
              className={'fireworks'}
            >
              <Fireworks
                className="h-screen w-screen"
                options={{
                  autoresize: true,
                  opacity: 0.6,
                  acceleration: 1,
                  friction: 0.97,
                  gravity: 1.5,
                  particles: mobile ? 20 : 50,
                  traceLength: mobile ? 1 : 2,
                  traceSpeed: mobile ? 4 : 6,
                  explosion: mobile ? 4 : 7,
                  intensity: mobile ? 2 : 5,
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
              unoptimized
            />
          </Box>
        </Box>

        <Box zIndex={2} position={'absolute'} bottom={0} left={0} w={'100vw'} h={'64px'}>
          <Box
            position={'absolute'}
            left={0}
            bottom={0}
            w={'12px'}
            h={'64px'}
            bg={'url("/images/ground/ground.1.png") no-repeat left top'}
            backgroundSize={'12px 128px'}
          />
          <Box
            position={'absolute'}
            left={'12px'}
            right={'4px'}
            bottom={0}
            h={'64px'}
            bg={'url("/images/ground/ground.2.png") repeat-x left top'}
            backgroundSize={'64px 128px'}
          />
          <Box
            position={'absolute'}
            right={0}
            bottom={0}
            w={'4px'}
            h={'64px'}
            bg={'url("/images/ground/ground.3.png") no-repeat left top'}
            backgroundSize={'4px 128px'}
          />
        </Box>

        <Box
          as={motion.div}
          zIndex={3}
          alignItems={'center'}
          justifyContent={'center'}
          opacity={0}
          px={4}
          maxW={'100%'}
          initial={false}
          animate={
            visible
              ? { opacity: 1, translateY: 0, transition: { duration: 0.6 } }
              : { opacity: 0, translateY: -300 }
          }
        >
          <VStack spacing={{ base: 8, md: 16 }} maxW={'100%'}>
            <Wordmark textAlign={'center'} w={{ base: '320px', md: '700px' }} />

            <Heading
              as={motion.div}
              size={{ base: 'xl', md: '4xl' }}
              color={courseClear ? 'white' : 'red.500'}
              letterSpacing={{ base: '2px', md: '4px' }}
              textTransform={'uppercase'}
              initial={{ scale: 1 }}
              whileInView={{
                scale: [1.06, 1.12, 1.06],
                transition: {
                  type: 'keyframes',
                  times: [0, 0.5, 1],
                  delay: 0,
                  duration: 1.8,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  repeatDelay: 0,
                },
              }}
            >
              {courseClear ? 'COURSE CLEAR!' : 'GAME OVER'}
            </Heading>

            <VStack spacing={0}>
              <Heading
                as={motion.div}
                size={{ base: 'xl', md: '4xl' }}
                textAlign={'center'}
                color={'white'}
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
                size={{ base: 'xl', md: '4xl' }}
                textAlign={'center'}
                color={'white'}
                cursor={'pointer'}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                _hover={{ color: 'cyan.500' }}
              >
                <Link
                  as={NextLink}
                  color={'white'}
                  href={'https://github.com/engelde/portfolio'}
                  target={'_blank'}
                  _hover={{ color: 'cyan.500' }}
                >
                  {'> view source'}
                </Link>
              </Heading>
            </VStack>

            <HStack justifyContent={'center'} verticalAlign={'middle'} spacing={{ base: 5, md: 8 }}>
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
                      unoptimized
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
                      unoptimized
                    />
                  </Box>
                </Tooltip>
              </Link>

              <Link as={NextLink} href={'https://orcid.org/0009-0001-0780-738X'} target={'_blank'}>
                <Tooltip label={'ORCID'} bg={'black'}>
                  <Box
                    as={motion.div}
                    cursor={'pointer'}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.12 }}
                  >
                    <NextImage
                      alt={'ORCID'}
                      src={'/images/orcid/orcid.png'}
                      width={50}
                      height={50}
                      draggable={false}
                      unoptimized
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
