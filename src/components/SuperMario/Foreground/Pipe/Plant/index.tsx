import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  variant: 1 | 2
  forwards: boolean
  x: number
  y: number
}

const Plant: FC<Props> = ({ variant, forwards, x, y }: Props) => {
  return (
    <Box
      zIndex={-1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      p={0}
      className={
        styles.plant + ' ' + (variant == 2 && styles.v2) + ' ' + (!forwards && styles.reverse)
      }
    />
  )
}

export default Plant
