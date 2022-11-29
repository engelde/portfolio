import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
}

const Turtle: FC<Props> = ({ x, y }: Props) => {
  return (
    <Box
      zIndex={9}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      height={'160px'}
      width={'80px'}
      background={'url("/images/turtle/turtle.1.png") no-repeat center center / contain'}
      className={'animate__animated animate__fadeInUp ' + styles.turtle}
    />
  )
}

export default Turtle
