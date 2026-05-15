'use client'

import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

import { useAudio } from '@/hooks/useAudio'

import Pipe from '../foreground/pipe'
import About from './about'
import Dog from './dog'
import End from './end'
import Intro from './intro'
import ScrollIndicator from './scroll-indicator'
import Skills from './skills'
import Thanks from './thanks'

// Memoize overlay sections
const MemoizedIntro = React.memo(Intro)
const MemoizedAbout = React.memo(About)
const MemoizedSkills = React.memo(Skills)
const MemoizedThanks = React.memo(Thanks)
const MemoizedDog = React.memo(Dog)
const MemoizedEnd = React.memo(End)
const MemoizedPipe = React.memo(Pipe)
const MemoizedScrollIndicator = React.memo(ScrollIndicator)

export type OverlayProps = {
  complete: boolean
  ip: string
  forwards: boolean
  length: number
  xOffset: number
  xPos: number
  yPos: number
}

const Overlay = ({ complete, ip, forwards, length, xOffset, xPos, yPos }: OverlayProps) => {
  const { playAudio } = useAudio()
  const [exited, setExited] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!exited && !exiting && forwards && xPos >= 12860 && xPos < 13120 && yPos <= 144) {
      setExited(true)
      setExiting(true)
      playAudio('pipe')

      setTimeout(() => setExiting(false), 1400)
    }

    if (exited && !exiting && xPos < 12900) {
      setExited(false)
    }
  }, [exited, exiting, forwards, xPos, yPos, playAudio])

  return (
    <>
      <MemoizedScrollIndicator xPos={xPos} />

      <MemoizedIntro xPos={xPos} xMin={0} xMax={2420} ip={ip} />

      <MemoizedAbout xPos={xPos} xMin={2840} xMax={7000} variant={xPos < 4900 ? 1 : 2} />

      <MemoizedSkills xPos={xPos} xMin={7240} xMax={10000} offset={8360} />

      <MemoizedThanks xPos={xPos} xMin={10200} xMax={11960} offset={10680} />

      <MemoizedDog xPos={xPos} xMin={11760} xMax={16000} offset={12780} />

      <Box zIndex={10} position={'absolute'} left={13040} bottom={'64px'} w={'410px'} h={'160px'}>
        <MemoizedPipe x={0} y={0} height={410} rotate={-90} />
      </Box>

      <MemoizedEnd complete={complete} x={length - xOffset} xPos={xPos} />
    </>
  )
}

export default Overlay
