import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  forwards: boolean
  active: boolean
  x: number
  y: number
}

const Fire: FC<Props> = ({ forwards, active, x, y }: Props) => {
  return (
    <Box
      zIndex={9}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      p={0}
      opacity={active ? 1 : 0}
      className={styles.fire + ' ' + (!forwards && styles.reverse)}
    />
  )
}

export default Fire
