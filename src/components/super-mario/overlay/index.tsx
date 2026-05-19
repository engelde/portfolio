'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMediaQuery } from '@chakra-ui/react'

import { useAudio } from '@/hooks/useAudio'

import About from './about'
import Dog from './dog'
import Intro from './intro'
import ScrollIndicator from './scroll-indicator'
import SkillsMobile from './skills-mobile'
import Thanks from './thanks'

const Skills = dynamic(() => import('./skills'), { ssr: false })

// Memoize overlay sections
const MemoizedIntro = React.memo(Intro)
const MemoizedAbout = React.memo(About)
const MemoizedSkills = React.memo(Skills)
const MemoizedSkillsMobile = React.memo(SkillsMobile)
const MemoizedThanks = React.memo(Thanks)
const MemoizedDog = React.memo(Dog)
const MemoizedScrollIndicator = React.memo(ScrollIndicator)

export type OverlayProps = {
  ip: string
  forwards: boolean
  xPos: number
  yPos: number
}

const Overlay = ({ ip, forwards, xPos, yPos }: OverlayProps) => {
  const { playAudio } = useAudio()
  const [mobile] = useMediaQuery('(max-width: 48rem)')
  const [exited, setExited] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (mobile) return

    const preloadSkills = () => void import('./skills')

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadSkills, { timeout: 4000 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeout = globalThis.setTimeout(preloadSkills, 1600)
    return () => globalThis.clearTimeout(timeout)
  }, [mobile])

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

      {mobile && xPos > 6800 && xPos < 10200 && (
        <MemoizedSkillsMobile xPos={xPos} xMin={7240} xMax={10000} offset={8360} />
      )}

      {!mobile && xPos > 6800 && xPos < 10200 && (
        <MemoizedSkills xPos={xPos} xMin={7240} xMax={10000} offset={8360} />
      )}

      <MemoizedThanks xPos={xPos} xMin={10200} xMax={11960} offset={10680} />

      <MemoizedDog xPos={xPos} xMin={11760} xMax={16000} offset={12780} />
    </>
  )
}

export default Overlay
