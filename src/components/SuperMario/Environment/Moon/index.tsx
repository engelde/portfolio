import { FC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = BoxProps & {}

const Moon: FC<Props> = ({ ...rest }: Props) => {
  return (
    <Box
      zIndex={-99}
      minWidth={'full'}
      position={'fixed'}
      top={0}
      right={0}
      p={0}
      className={'animate__animated animate__fadeInRightBig'}
      {...rest}>
      <Box bg={'gray.200'} className={styles.moon + ' ' + styles.md} />
      <Box bg={'gray.300'} className={styles.moon + ' ' + styles.sm} />
    </Box>
  )
}

export default Moon
