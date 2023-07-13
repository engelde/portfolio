import type { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

export type RockProps = {
  x: number
  y: number
}

const Rock: FC<RockProps> = ({ x, y }: RockProps) => {
  return (
    <Box zIndex={2} position={'absolute'} left={x + 'px'} bottom={y + 'px'} w={'80px'} h={'80px'}>
      <NextImage alt={'rock'} src={'/images/rock/rock.png'} width={80} height={80} priority />
    </Box>
  )
}

export default Rock
