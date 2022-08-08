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
      left={0}
      p={0}
      className={'animate__animated animate__fadeInDownBig'}
      {...rest}>
      <Box className={styles.cloud + ' ' + styles.a} />
      <Box className={styles.cloud + ' ' + styles.b} />
      <Box className={styles.cloud + ' ' + styles.c} />
      <Box className={styles.cloud + ' ' + styles.d} />
      <Box className={styles.cloud + ' ' + styles.e} />
      <Box className={styles.cloud + ' ' + styles.f} />
      <Box className={styles.cloud + ' ' + styles.g} />
      <Box className={styles.cloud + ' ' + styles.h} />
      <Box className={styles.cloud + ' ' + styles.i} />
      <Box className={styles.cloud + ' ' + styles.j} />
      <Box className={styles.cloud + ' ' + styles.k} />
      <Box className={styles.cloud + ' ' + styles.l} />
    </Box>
  )
}

export default Sun
