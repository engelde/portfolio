import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  variant: 1 | 2 | 3 | 4
  x: number
  y: number
}

const Cube: FC<Props> = ({ variant, x, y }: Props) => {
  return (
    <Box
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      p={0}
      className={'animate__animated animate__slow animate__fadeInUp ' + styles['v' + variant]}
    />
  )
}

export default Cube
