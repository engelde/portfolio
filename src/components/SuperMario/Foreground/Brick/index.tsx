import { FC } from 'react'
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
      background={'url("/images/brick/brick.png") no-repeat center center / cover'}
      className={'animate__animated animate__fadeInUp ' + styles.brick}
    />
  )
}

export default Brick
