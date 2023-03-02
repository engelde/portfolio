import { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

type Props = {
  x: number
  y: number
}

const Bush: FC<Props> = ({ x, y }: Props) => {
  return (
    <Box
      zIndex={-99}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      height={'80px'}
      width={'80px'}
      p={0}
      className={'animate__animated animate__fadeInUp'}>
      <NextImage
        alt={'Bush'}
        src={'/images/bush/bush.png'}
        height={80}
        width={80}
        quality={80}
        priority
      />
    </Box>
  )
}

export default Bush
