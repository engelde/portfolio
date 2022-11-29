import { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

type Props = {
  variant: 1 | 2 | 3 | 4
  x: number
  y: number
}

const Cube: FC<Props> = ({ variant, x, y }: Props) => {
  return (
    <>
      {(variant === 1 && (
        <Box
          zIndex={1}
          position={'absolute'}
          left={x + 'px'}
          bottom={y + 'px'}
          height={'400px'}
          width={'441px'}
          p={0}
          className={'animate__animated animate__slow animate__fadeInUp'}>
          <NextImage
            alt={'Cube 1'}
            src={'/images/cube/cube.1.png'}
            height={'400px'}
            width={'441px'}
            quality={80}
            priority
          />
        </Box>
      )) ||
        (variant === 2 && (
          <Box
            zIndex={1}
            position={'absolute'}
            left={x + 'px'}
            bottom={y + 'px'}
            height={'560px'}
            width={'1080px'}
            p={0}
            className={'animate__animated animate__slow animate__fadeInUp'}>
            <NextImage
              alt={'Cube 2'}
              src={'/images/cube/cube.2.png'}
              height={'560px'}
              width={'1080px'}
              quality={80}
              priority
            />
          </Box>
        )) ||
        (variant === 3 && (
          <Box
            zIndex={1}
            position={'absolute'}
            left={x + 'px'}
            bottom={y + 'px'}
            height={'480px'}
            width={'919px'}
            p={0}
            className={'animate__animated animate__slow animate__fadeInUp'}>
            <NextImage
              alt={'Cube 3'}
              src={'/images/cube/cube.3.png'}
              height={'480px'}
              width={'919px'}
              quality={80}
              priority
            />
          </Box>
        )) ||
        (variant === 4 && (
          <Box
            zIndex={1}
            position={'absolute'}
            left={x + 'px'}
            bottom={y + 'px'}
            height={'785px'}
            width={'480px'}
            p={0}
            className={'animate__animated animate__slow animate__fadeInUp'}>
            <NextImage
              alt={'Cube 4'}
              src={'/images/cube/cube.4.png'}
              height={'785px'}
              width={'480px'}
              quality={80}
              priority
            />
          </Box>
        ))}
    </>
  )
}

export default Cube
