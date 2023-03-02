import { FC } from 'react'
import NextImage from 'next/image'
import { VStack, Box } from '@chakra-ui/react'
import Fire from './Fire'
import Plant from './Plant'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
  height: number
  rotate?: number
  plant?: boolean
  plantVariant?: 1 | 2
  forwards?: boolean
  active?: boolean
}

const Pipe: FC<Props> = ({
  x,
  y,
  height,
  rotate,
  plant,
  plantVariant,
  forwards,
  active,
}: Props) => {
  return (
    <Box width={'160px'} zIndex={1} position={'absolute'} left={x + 'px'} bottom={y + 'px'} p={0}>
      <VStack
        spacing={0}
        mb={rotate !== undefined ? '-' + (height / 2 - 76) + 'px' : '0px'}
        transform={'rotate(' + ((rotate !== undefined && rotate + 'deg') || '0deg') + ')'}>
        <NextImage
          alt={'Pipe'}
          src={'/images/pipe/pipe.0.png'}
          height={80}
          width={160}
          quality={80}
          priority
        />
        <Box height={height - 80 + 'px'} width={'160px'} className={styles.pipe} />
      </VStack>
      {plant && (
        <>
          <Plant
            x={40}
            y={height}
            variant={plantVariant !== undefined ? plantVariant : 1}
            forwards={forwards !== undefined ? forwards : true}
          />
          {plantVariant == 2 && (
            <Fire
              x={40}
              y={height + 80}
              forwards={forwards !== undefined ? forwards : true}
              active={active !== undefined ? active : true}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default Pipe
