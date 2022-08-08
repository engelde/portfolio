import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {}

const Daylight: FC<Props> = ({}: Props) => {
  return (
    <Box
      minH={'100vh'}
      minW={'full'}
      position={'fixed'}
      top={0}
      left={0}
      p={0}
      className={styles.daylight}
    />
  )
}

export default Daylight
