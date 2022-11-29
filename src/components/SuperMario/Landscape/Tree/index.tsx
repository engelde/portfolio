import { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

type Props = {
  variant: 1 | 2 | 3
  x: number
  y: number
}

const Tree: FC<Props> = ({ variant, x, y }: Props) => {
  return (
    <>
      {(variant === 1 && (
        <Box
          zIndex={-99}
          position={'absolute'}
          left={x + 'px'}
          bottom={y + 'px'}
          height={'244px'}
          width={'320px'}
          p={0}
          className={'animate__animated animate__fadeInUp'}>
          <NextImage
            alt={'Tree 1'}
            src={'/images/tree/tree.1.png'}
            height={'244px'}
            width={'320px'}
            quality={80}
            priority
          />
        </Box>
      )) ||
        (variant === 2 && (
          <Box
            zIndex={-99}
            position={'absolute'}
            left={x + 'px'}
            bottom={y + 'px'}
            height={'320px'}
            width={'640px'}
            p={0}
            className={'animate__animated animate__fadeInUp'}>
            <NextImage
              alt={'Tree 2'}
              src={'/images/tree/tree.2.png'}
              height={'320px'}
              width={'640px'}
              quality={80}
              priority
            />
          </Box>
        )) ||
        (variant === 3 && (
          <Box
            zIndex={-99}
            position={'absolute'}
            left={x + 'px'}
            bottom={y + 'px'}
            height={'640px'}
            width={'480px'}
            p={0}
            className={'animate__animated animate__fadeInUp'}>
            <NextImage
              alt={'Tree 3'}
              src={'/images/tree/tree.3.png'}
              height={'640px'}
              width={'480px'}
              quality={80}
              priority
            />
          </Box>
        ))}
    </>
  )
}

export default Tree
