import { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
}

const Brick: FC<Props> = ({ x, y }: Props) => {
  return (
    <Box
      zIndex={-99}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      p={0}
      height={'80px'}
      width={'80px'}
      className={'animate__animated animate__fadeInUp ' + styles.brick}>
      <NextImage
        alt={'Brick'}
        src={'/images/brick/brick.png'}
        height={'80px'}
        width={'80px'}
        quality={80}
        priority
      />
    </Box>
  )
}

export default Brick
