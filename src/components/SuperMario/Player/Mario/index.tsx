import { FC, useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

type Props = {
  variant: 1 | 2
  x: number
  y: number
  xPos: number
  forwards: boolean
  jump: boolean
}

type VariantProps = {
  [variant: string]: {
    [state: number]: {
      src: string
      width: number
      height: number
    }
  }
}

const Mario: FC<Props> = ({ variant, x, y, xPos, forwards, jump }: Props) => {
  const variants: VariantProps = {
    1: {
      1: {
        src: '/images/mario/mario.sm.1.png',
        width: 100,
        height: 100,
      },
      2: {
        src: '/images/mario/mario.sm.2.png',
        width: 100,
        height: 100,
      },
    },
    2: {
      1: {
        src: '/images/mario/mario.lg.1.png',
        width: 80,
        height: 160,
      },
      2: {
        src: '/images/mario/mario.lg.2.png',
        width: 80,
        height: 160,
      },
    },
  }

  const jumpVariants: VariantProps = {
    1: {
      1: {
        src: '/images/mario/mario.sm.jump.png',
        width: 100,
        height: 100,
      },
    },
    2: {
      1: {
        src: '/images/mario/mario.lg.jump.png',
        width: 80,
        height: 160,
      },
    },
  }

  const [prevDirection, setPrevDirection] = useState(forwards)
  const [prevXPos, setPrevXPos] = useState(xPos)
  const [state, setState] = useState(1)
  const [steps, setSteps] = useState(1)
  const speed = 6

  useEffect(() => {
    if (xPos !== prevXPos) {
      if (forwards !== prevDirection) {
        setPrevDirection(forwards)
        setSteps(steps + 1)
      }

      setSteps(steps + 1)

      if (steps >= speed) {
        setSteps(1)
        setState(state < 2 ? state + 1 : 1)
      }

      setPrevXPos(xPos)
    }
  }, [forwards, state, steps, xPos, prevDirection, prevXPos])

  return (
    <Box
      zIndex={9990}
      position={'fixed'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={(jump ? jumpVariants[variant][1].width : variants[variant][state].width) + 'px'}
      h={(jump ? jumpVariants[variant][1].height : variants[variant][state].height) + 'px'}
      transform={!forwards ? 'scaleX(-1)' : ''}>
      <NextImage
        alt={'mario'}
        src={jump ? jumpVariants[variant][1].src : variants[variant][state].src}
        width={jump ? jumpVariants[variant][1].width : variants[variant][state].width}
        height={jump ? jumpVariants[variant][1].height : variants[variant][state].height}
        priority
      />
    </Box>
  )
}

export default Mario
