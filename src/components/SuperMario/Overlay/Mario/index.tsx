import { FC, useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

type ImageVariants = {
  [variant: string]: string[]
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

const images: ImageVariants = {
  sm: ['/images/mario/mario.sm.1.png', '/images/mario/mario.sm.2.png'],
  lg: ['/images/mario/mario.lg.1.png', '/images/mario/mario.lg.2.png'],
}

const jumpImages: ImageVariants = {
  sm: ['/images/mario/mario.sm.jump.png'],
  lg: ['/images/mario/mario.lg.jump.png'],
}

const Mario: FC<Props> = ({ variant, x, y, xPos, forwards, moving, jump }: Props) => {
  const [prevDirection, setPrevDirection] = useState(forwards)
  const [prevXPos, setPrevXPos] = useState(xPos)
  const [speed, setSpeed] = useState(8)
  const [count, setCount] = useState(0)
  const [image, setImage] = useState('/images/mario/mario.sm.1.png')

  // Variant switch
  useEffect(() => {
    if (!images[variant].includes(image)) {
      setImage(images[variant][0])
    }
  }, [image, setImage, variant])

  // Movement
  useEffect(() => {
    if (xPos !== prevXPos) {
      if (forwards === prevDirection) {
        setCount(count === images[variant].length * speed - 1 ? 0 : count + 1)
      } else {
        setCount(0)
      }

      let img = images[variant][Math.floor(count / speed)]
      if (image !== img) {
        setImage(img)
      }
    }

    if (prevDirection !== forwards) {
      setPrevDirection(forwards)
    }

    if (prevXPos !== xPos) {
      setPrevXPos(xPos)
    }
  }, [
    count,
    forwards,
    image,
    moving,
    prevDirection,
    prevXPos,
    setImage,
    setPrevXPos,
    speed,
    variant,
    x,
    xPos,
  ])

  return (
    <Box
      zIndex={9990}
      position={'fixed'}
      left={x + 'px'}
      bottom={y + 'px'}
      height={variant === 'lg' ? '160px' : '100px'}
      width={variant === 'lg' ? '80px' : '100px'}
      filter={'brightness(115%)'}
      transform={!forwards ? 'scaleX(-1)' : ''}>
      <NextImage
        alt={'Mario'}
        src={jump ? jumpImages[variant][0] : image}
        height={variant === 'lg' ? 160 : 100}
        width={variant === 'lg' ? 80 : 100}
        quality={80}
        priority
      />
    </Box>
  )
}

export default Mario
