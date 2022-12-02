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
      background={
        'url("/_next/image?url=%2Fimages%2Fgoomba%2Fgoomba.1.png&w=256&q=80") no-repeat center center / contain'
      }
      className={'animate__animated animate__fadeInUp ' + styles.goomba}
    />
  )
}

export default Goomba
