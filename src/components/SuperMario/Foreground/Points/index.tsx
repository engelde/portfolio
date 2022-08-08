import { FC } from 'react'
import { Text } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
  total: number
}

const Points: FC<Props> = ({ x, y, total }: Props) => {
  return (
    <Text
      zIndex={-99}
      position={'absolute'}
      width={'80px'}
      height={'80px'}
      textAlign={'center'}
      fontWeight={'bold'}
      textShadow={'3px 3px rgba(0, 0, 0, 0.8)'}
      fontSize={'4xl'}
      left={x + 'px'}
      bottom={y + 80 + 'px'}
      p={0}
      className={styles.points}>
      {total}
    </Text>
  )
}

export default Points
