'use client'

import { useMemo } from 'react'
import { Box } from '@chakra-ui/react'

import Footer from '@/components/footer'
import { useWindow } from '@/hooks/useWindow'
import type { PlayerCharacter } from '@/lib/store'

import Pipe from '../foreground/pipe'
import PipeRoomItemLayer from './components/item-layer'
import PipeRoomMessageForm from './components/message-form'
import PipeRoomPlayerSprite from './components/player-sprite'
import WallRun from './components/wall-run'
import { createPipeRoomLayout, getOutsideWallRuns } from './layout'
import { getPipeRoomConfig } from './rooms'
import type { PipeRoomId } from './types'
import { pipeRoomExitDelay, usePipeRoomEngine } from './usePipeRoomEngine'

type PipeRoomProps = {
  character: PlayerCharacter
  collectedCoinIds: Record<string, true>
  onCollectCoin: (id: string, value: number) => void
  onExit: () => void
  roomId?: PipeRoomId
  variant: 1 | 2 | 3
}

const PipeRoom = ({
  character,
  collectedCoinIds,
  onCollectCoin,
  onExit,
  roomId = 'default',
  variant,
}: PipeRoomProps) => {
  const { width, height } = useWindow()
  const roomConfig = getPipeRoomConfig(roomId)
  const layout = useMemo(() => createPipeRoomLayout(roomConfig), [roomConfig])
  const roomLeft = Math.round((width - layout.width) / 2)
  const outsideWalls = useMemo(
    () => getOutsideWallRuns(layout, roomLeft, width, height),
    [height, layout, roomLeft, width]
  )
  const {
    collectingCoinIds,
    collectCoinById,
    exiting,
    frame,
    playerTop,
    playerTransform,
    position,
    roomRef,
    sprite,
  } = usePipeRoomEngine({
    collectedCoinIds,
    layout,
    onCollectCoin,
    onExit,
    variant,
  })

  return (
    <Box
      ref={roomRef}
      aria-label={'pipe room'}
      position={'fixed'}
      inset={0}
      zIndex={50}
      overflow={'hidden'}
      bg={'black'}
      pointerEvents={'auto'}
    >
      {outsideWalls.map((region) => (
        <WallRun
          key={region.id}
          {...region}
          image={layout.assets.wall}
          tileSize={layout.tileSize}
        />
      ))}

      <Box
        aria-label={'pipe room chamber'}
        position={'absolute'}
        left={roomLeft + 'px'}
        top={0}
        w={layout.width + 'px'}
        h={layout.height + 'px'}
        overflow={'hidden'}
        bg={'black'}
      >
        {layout.wallRuns.map((region) => (
          <WallRun
            key={region.id}
            {...region}
            image={layout.assets.wall}
            tileSize={layout.tileSize}
          />
        ))}

        <PipeRoomItemLayer
          collectedCoinIds={collectedCoinIds}
          collectingCoinIds={collectingCoinIds}
          coins={layout.coins}
          onCoinCollect={collectCoinById}
          prizeBoxes={layout.prizeBoxes}
          tileSize={layout.tileSize}
        />

        {layout.messageForm && <PipeRoomMessageForm form={layout.messageForm} onCancel={onExit} />}

        {layout.pipes.map((pipe) => (
          <Pipe
            key={pipe.id}
            animateEntry={false}
            direction={pipe.direction ?? 'down'}
            height={pipe.height}
            placement={pipe.placement ?? 'top'}
            skin={pipe.skin ?? 'alt'}
            x={pipe.x}
            y={pipe.y}
            zIndex={pipe.zIndex ?? 4}
          />
        ))}

        <PipeRoomPlayerSprite
          character={character}
          exiting={exiting}
          frame={frame}
          playerTop={playerTop}
          position={position}
          sprite={sprite}
          transform={playerTransform}
          transition={exiting ? `top ${pipeRoomExitDelay}ms ease-in, left 120ms linear` : undefined}
        />
      </Box>

      <Footer animated={false} dark />
    </Box>
  )
}

export default PipeRoom
