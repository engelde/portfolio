import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
  offset: number
}

const Goomba: FC<Props> = ({ x, y, offset }: Props) => {
  return (
    <Box
      zIndex={9}
      position={'absolute'}
      height={'80px'}
      width={'80px'}
      ml={'-' + offset}
      left={x + 'px'}
      bottom={y + 'px'}
      background={'url("/images/goomba/goomba.1.png") no-repeat center center / contain'}
      className={'animate__animated animate__fadeInUp ' + styles.goomba}
    />
  )
}

export default Goomba
