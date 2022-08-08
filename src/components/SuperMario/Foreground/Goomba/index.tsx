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
      left={x + 'px'}
      bottom={y + 'px'}
      height={'80px'}
      width={'80px'}
      animation={''}
      ml={'-' + offset}
      className={'animate__animated animate__fadeInUp ' + styles.goomba}
    />
  )
}

export default Goomba
