import { Box, Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import type { PipeRoomCoin, PipeRoomPrizeBox } from '../types'

type PipeRoomItemLayerProps = {
  coins: PipeRoomCoin[]
  collectedCoinIds: Record<string, true>
  collectingCoinIds: Record<string, true>
  prizeBoxes: PipeRoomPrizeBox[]
  tileSize: number
}

const coinSpin = keyframes`
  0%, 19.99% { background-position: 0 0; }
  20%, 39.99% { background-position: -80px 0; }
  40%, 59.99% { background-position: -160px 0; }
  60%, 79.99% { background-position: -240px 0; }
  80%, 99.99% { background-position: -320px 0; }
  100% { background-position: 0 0; }
`

const coinCollect = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  70% {
    opacity: 1;
    transform: translateY(-64px);
  }
  100% {
    opacity: 0;
    transform: translateY(-80px);
  }
`

const pointsFloat = keyframes`
  0%, 20% {
    opacity: 0;
    transform: translateY(24px);
  }
  30%, 70% {
    opacity: 1;
    transform: translateY(0);
  }
  90%, 100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`

const PipeRoomItemLayer = ({
  coins,
  collectedCoinIds,
  collectingCoinIds,
  prizeBoxes,
  tileSize,
}: PipeRoomItemLayerProps) => (
  <>
    {coins.map(({ id, value = 100, x, y }) => {
      const collecting = Boolean(collectingCoinIds[id])
      if (collectedCoinIds[id] && !collecting) return null

      return (
        <Box key={id}>
          {collecting && (
            <Text
              aria-hidden={'true'}
              position={'absolute'}
              left={x + 'px'}
              top={y - 40 + 'px'}
              zIndex={4}
              w={tileSize + 'px'}
              h={tileSize + 'px'}
              p={0}
              color={'white'}
              fontSize={'4xl'}
              fontWeight={'bold'}
              textAlign={'center'}
              textShadow={'3px 3px rgba(0, 0, 0, 0.8)'}
              sx={{
                animation: `${pointsFloat} 0.8s ease-in-out forwards`,
              }}
            >
              {value}
            </Text>
          )}

          <Box
            aria-label={'pipe room coin'}
            role={'img'}
            position={'absolute'}
            left={x + 'px'}
            top={y + 'px'}
            zIndex={3}
            w={tileSize + 'px'}
            h={tileSize + 'px'}
            pointerEvents={'none'}
            sx={{
              animation: collecting ? `${coinCollect} 0.6s ease-in-out forwards` : 'none',
            }}
          >
            <Box
              w={tileSize + 'px'}
              h={tileSize + 'px'}
              bgImage={'url("/images/coin/coin.sprite.png")'}
              bgPosition={'0 0'}
              bgRepeat={'no-repeat'}
              bgSize={`${tileSize * 5}px ${tileSize}px`}
              sx={{
                animation: `${coinSpin} 0.52s steps(1) infinite`,
                imageRendering: 'pixelated',
              }}
            />
          </Box>
        </Box>
      )
    })}

    {prizeBoxes.map(({ id, x, y }) => (
      <Box
        key={id}
        aria-label={'pipe room prize box'}
        role={'img'}
        position={'absolute'}
        left={x + 'px'}
        top={y + 'px'}
        w={tileSize + 'px'}
        h={tileSize + 'px'}
        bgImage={'url("/images/box/box.sprite.png")'}
        bgPosition={`-${tileSize}px 0`}
        bgRepeat={'no-repeat'}
        bgSize={`${tileSize * 5}px ${tileSize}px`}
        sx={{ imageRendering: 'pixelated' }}
      />
    ))}
  </>
)

export default PipeRoomItemLayer
