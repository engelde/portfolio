import { FC, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type AnimationsType = {
  [key: string]: {
    speed: number
    delimiter: number
    frames: string[]
  }
}

type Props = {
  variant: string
  x: number
  y: number
  xPos: number
  forwards: boolean
  moving: boolean
  jump: boolean
}

const Mario: FC<Props> = ({ variant, x, y, xPos, forwards, moving, jump }: Props) => {
  const [prevDirection, setPrevDirection] = useState(forwards)
  const [prevXPos, setPrevXPos] = useState(xPos)
  const [count, setCount] = useState(0)
  const [image, setImage] = useState('/images/mario/mario.sm.1.png')

  useEffect(() => {
    if (
      variant === 'lg' &&
      (image === '/images/mario/mario.sm.1.png' || image === '/images/mario/mario.sm.2.png')
    ) {
      setImage('/images/mario/mario.lg.1.png')
    }
  }, [variant, image, setImage])

  useEffect(() => {
    if (xPos !== prevXPos) {
      const animations: AnimationsType = {
        sm: {
          speed: 12,
          delimiter: 6,
          frames: ['/images/mario/mario.sm.1.png', '/images/mario/mario.sm.2.png'],
        },
        lg: {
          speed: 15,
          delimiter: 5,
          frames: [
            '/images/mario/mario.lg.1.png',
            '/images/mario/mario.lg.2.png',
            '/images/mario/mario.lg.3.png',
          ],
        },
      }

      if (forwards === prevDirection) {
        setCount(count === animations[variant].speed - 1 ? 0 : count + 1)
      } else {
        setCount(0)
      }

      let img = animations[variant].frames[Math.floor(count / animations[variant].delimiter)]
      if (image !== img) setImage(img)
    }
    if (prevDirection !== forwards) setPrevDirection(forwards)
    if (prevXPos !== xPos) setPrevXPos(xPos)
  }, [
    count,
    forwards,
    image,
    moving,
    prevDirection,
    prevXPos,
    xPos,
    setImage,
    setPrevXPos,
    x,
    variant,
  ])

  return (
    <Box
      zIndex={9990}
      position={'fixed'}
      left={x + 'px'}
      bottom={y + 'px'}
      style={{ animationPlayState: !moving ? 'paused' : 'running' }}
      backgroundImage={image}
      className={
        styles.mario +
        ' ' +
        (!forwards && styles.reverse) +
        ' ' +
        (variant == 'lg' && styles.lg) +
        ' ' +
        (jump && (variant == 'sm' ? styles.jump : styles.jumpLg))
      }
    />
  )
}

export default Mario
