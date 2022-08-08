import { FC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = BoxProps & {}

const Sky: FC<Props> = ({ ...rest }: Props) => {
  return (
    <Box
      minH={'100vh'}
      width={'full'}
      zIndex={-99}
      minWidth={'full'}
      position={'fixed'}
      top={0}
      left={0}
      p={0}
      className={styles.sky}
      {...rest}
    />
  )
}

export default Sky
