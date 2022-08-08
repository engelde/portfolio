import { FC } from 'react'
import { HStack, Box } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  variant: number
  x: number
  height: number
  width: number
}

const Ground: FC<Props> = ({ variant, x, height, width }: Props) => {
  return (
    <Box width={width + 'px'} zIndex={-99} position={'absolute'} bottom={0} left={x + 'px'} p={0}>
      <HStack spacing={0}>
        <Box height={height + 'px'} width={'12px'} className={styles.ground1} />
        <Box
          height={height + 'px'}
          width={width - 16 + 'px'}
          className={styles.ground2}
          overflow={'hidden'}
        />
        <Box height={height + 'px'} width={'4px'} className={styles.ground3} />
      </HStack>
    </Box>
  )
}

export default Ground
