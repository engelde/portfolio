'use client'

import { useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const useSettings = () => {
  const [complete, setComplete] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const length = 13320
  const [lives, setLives] = useState(1)
  const [mario, setMario] = useState<1 | 2 | 3>(1)
  const offset = {
    mario: 40,
    x: 80,
    y: mario !== 3 ? 240 : 400,
  }
  const [mobile] = useMediaQuery(['(max-width: 48rem)'])
  const [paused, setPaused] = useState(false)
  const [score, setScore] = useState(0)
  const speed = {
    x: 16,
    y: mario !== 3 ? 16 : 24,
  }
  const [timer, setTimer] = useState(300)

  const ceilingLevels = [
    { xMin: 1060, xMax: 1240, height: 214 }, // box 1
    { xMin: 1300, xMax: 1480, height: 454 }, // box 2
    { xMin: 2260, xMax: 2370, height: 374 }, // box 3
    { xMin: 3700, xMax: 3810, height: 198 }, // box 5
    { xMin: 7460, xMax: 7570, height: 134 }, // box 6
    { xMin: 11460, xMax: 11650, height: 444 }, // pipe 4
    { xMin: 12850, xMax: length, height: 104 }, // pipe 6
  ]

  const platformLevels = [
    { xMin: 1060, xMax: 1240, height: 384 }, // box 1
    { xMin: 1300, xMax: 1480, height: 624 }, // box 2
    { xMin: 1540, xMax: 1800, height: 460 }, // cube 1
    { xMin: 1380, xMax: 1640, height: 300 }, // cube 1
    { xMin: 1940, xMax: 2120, height: 300 }, // pipe 1
    { xMin: 2260, xMax: 2370, height: 544 }, // box 3
    { xMin: 2740, xMax: 3080, height: 624 }, // cube 2
    { xMin: 2500, xMax: 2840, height: 460 }, // cube 2
    { xMin: 2180, xMax: 2615, height: 300 }, // cube 2
    { xMin: 2730, xMax: 3260, height: 222 }, // cube 2
    { xMin: 3460, xMax: 3570, height: 208 }, // box 4
    { xMin: 3700, xMax: 3810, height: 368 }, // box 5
    { xMin: 6740, xMax: 7330, height: 544 }, // cube 3
    { xMin: 6580, xMax: 7180, height: 382 }, // cube 3
    { xMin: 6420, xMax: 7010, height: 222 }, // cube 3
    { xMin: 7460, xMax: 7570, height: 304 }, // box 6
    { xMin: 7620, xMax: 7810, height: 464 }, // rock 1
    { xMin: 8100, xMax: 8210, height: 304 }, // rock 2
    { xMin: 8010, xMax: 8210, height: 224 }, // rock 2
    { xMin: 7930, xMax: 8210, height: 144 }, // rock 2
    { xMin: 8410, xMax: 8520, height: 304 }, // rock 3
    { xMin: 8410, xMax: 8610, height: 224 }, // rock 3
    { xMin: 8410, xMax: 8690, height: 144 }, // rock 3
    { xMin: 10110, xMax: 10450, height: 304 }, // brick 1
    { xMin: 10020, xMax: 10450, height: 224 }, // brick 1
    { xMin: 9930, xMax: 10540, height: 144 }, // brick 1
    { xMin: 10650, xMax: 10760, height: 224 }, // brick 2
    { xMin: 10650, xMax: 10850, height: 144 }, // brick 2
    { xMin: 10900, xMax: 11170, height: 304 }, // cube 4
    { xMin: 9140, xMax: 9330, height: 224 }, // pipe 2
    { xMin: 9460, xMax: 9650, height: 304 }, // pipe 3
    { xMin: 11460, xMax: 11650, height: 304 }, // pipe 4
    { xMin: 11780, xMax: 11970, height: 224 }, // pipe 5
    { xMin: 12840, xMax: 13280, height: 215 }, // pipe 6
  ]

  const groundLevels = [
    { xMin: 0, xMax: 3272, height: 64 },
    { xMin: 3278, xMax: 5800, height: 128 },
    { xMin: 5800, xMax: length, height: 64 },
  ]

  // Timer
  useEffect(() => {
    if (!complete && !paused && timer > 0) {
      const timeout = setTimeout(() => !complete && !paused && setTimer(timer - 1), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
    return () => {}
  }, [complete, paused, timer])

  return {
    ceilingLevels,
    complete,
    gameOver,
    groundLevels,
    length,
    lives,
    mario,
    mobile,
    offset,
    paused,
    platformLevels,
    score,
    speed,
    timer,
    setComplete,
    setGameOver,
    setLives,
    setMario,
    setPaused,
    setScore,
    setTimer,
  }
}
