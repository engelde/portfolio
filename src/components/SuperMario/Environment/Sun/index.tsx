import { FC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = BoxProps & {}

const Sun: FC<Props> = ({ ...rest }: Props) => {
  return (
    <Box
      zIndex={-99}
      minWidth={'full'}
      position={'fixed'}
      top={0}
      right={0}
      p={0}
      className={'animate__animated animate__fadeInDownBig'}
      {...rest}>
      <Box className={styles.sun + ' ' + styles.md} />
      <Box className={styles.sun + ' ' + styles.sm} />
    </Box>
  )
}

export default Sun
