import { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

type Props = {
  x: number
  y: number
}

const Rock: FC<Props> = ({ x, y }: Props) => {
  return (
    <Box
      zIndex={2}
      position={'absolute'}
      height={'80px'}
      width={'80px'}
      left={x + 'px'}
      bottom={y + 'px'}
      p={0}
      className={'animate__animated animate__fadeInUp'}>
      <NextImage
        alt={'Rock'}
        src={'/images/rock/rock.png'}
        height={80}
        width={80}
        quality={80}
        priority
      />
    </Box>
  )
}

export default Rock
