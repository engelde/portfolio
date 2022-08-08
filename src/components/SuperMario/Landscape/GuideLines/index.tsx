import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  length: number
}

const GuideLines: FC<Props> = ({ length }: Props) => {
  return (
    <Box
      h={'100vh'}
      w={length + 'px'}
      zIndex={-1}
      position={'absolute'}
      bottom={'64px'}
      left={0}
      p={0}
      className={styles.grid}
    />
  )
}

export default GuideLines
