import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
}

const Bush: FC<Props> = ({ x, y }: Props) => {
  return (
    <Box
      width={'80px'}
      zIndex={-99}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      p={0}
      className={'animate__animated animate__fadeInUp ' + styles.bush}
    />
  )
}

export default Bush
