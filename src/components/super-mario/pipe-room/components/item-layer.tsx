import { Box, Text } from '@chakra-ui/react'

import type { PipeRoomCoin, PipeRoomPrizeBox } from '../types'

type PipeRoomItemLayerProps = {
  coins: PipeRoomCoin[]
  collectedCoinIds: Record<string, true>
  collectingCoinIds: Record<string, true>
  onCoinCollect: (id: string) => void
  prizeBoxes: PipeRoomPrizeBox[]
  tileSize: number
}

const coinSpin = 'sm-pipe-room-coin-spin'

const coinCollect = 'sm-pipe-room-coin-collect'

const pointsFloat = 'sm-pipe-room-points-float'

const coinVisualScale = 0.8

const PipeRoomItemLayer = ({
  coins,
  collectedCoinIds,
  collectingCoinIds,
  onCoinCollect,
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
              css={{
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
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            w={tileSize + 'px'}
            h={tileSize + 'px'}
            cursor={collecting ? 'default' : 'pointer'}
            pointerEvents={'auto'}
            onClick={() => {
              if (!collecting) onCoinCollect(id)
            }}
            css={{
              animation: collecting ? `${coinCollect} 0.6s ease-in-out forwards` : 'none',
            }}
          >
            <Box
              w={tileSize + 'px'}
              h={tileSize + 'px'}
              bgImage={'url("/images/coin/coin.sprite.png")'}
              backgroundPosition={'0 0'}
              bgRepeat={'no-repeat'}
              bgSize={`${tileSize * 5}px ${tileSize}px`}
              css={{
                animation: `${coinSpin} 0.52s steps(1) infinite`,
                imageRendering: 'pixelated',
                transform: `scale(${coinVisualScale})`,
                transformOrigin: 'center',
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
        backgroundPosition={`-${tileSize}px 0`}
        bgRepeat={'no-repeat'}
        bgSize={`${tileSize * 5}px ${tileSize}px`}
        css={{
          imageRendering: 'pixelated',
        }}
      />
    ))}
  </>
)

export default PipeRoomItemLayer
