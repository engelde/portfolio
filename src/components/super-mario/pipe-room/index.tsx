'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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

const pipeRoomCameraFocusRatio = 0.72
const pipeRoomCameraLerp = 0.24

type PipeRoomProps = {
  character: PlayerCharacter
  collectedCoinIds: Record<string, true>
  onCollectCoin: (id: string, value: number) => void
  onExit: () => void
  roomId?: PipeRoomId
  variant: 1 | 2 | 3
}

type PipeRoomCameraInput = {
  layoutHeight: number
  layoutWidth: number
  playerBottom: number
  playerCenterX: number
  viewportHeight: number
  viewportWidth: number
}

const getPipeRoomCameraTarget = ({
  layoutHeight,
  layoutWidth,
  playerBottom,
  playerCenterX,
  viewportHeight,
  viewportWidth,
}: PipeRoomCameraInput) => {
  const minCameraX = viewportWidth > 0 ? Math.min(0, viewportWidth - layoutWidth) : 0
  const minCameraY = viewportHeight > 0 ? Math.min(0, viewportHeight - layoutHeight) : 0
  const targetX =
    viewportWidth <= 0 || viewportWidth >= layoutWidth ? 0 : viewportWidth * 0.42 - playerCenterX
  const targetY =
    viewportHeight <= 0 || viewportHeight >= layoutHeight
      ? 0
      : viewportHeight * pipeRoomCameraFocusRatio - playerBottom

  return {
    x: Math.min(0, Math.max(minCameraX, targetX)),
    y: Math.min(0, Math.max(minCameraY, targetY)),
  }
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
  const [camera, setCamera] = useState({ x: 0, y: 0 })
  const roomConfig = getPipeRoomConfig(roomId)
  const layout = useMemo(() => createPipeRoomLayout(roomConfig), [roomConfig])
  const roomLeft = width >= layout.width ? Math.round((width - layout.width) / 2) : 0
  const outsideWallWidth = Math.max(width, layout.width)
  const cameraInputRef = useRef<PipeRoomCameraInput>({
    layoutHeight: layout.height,
    layoutWidth: layout.width,
    playerBottom: 0,
    playerCenterX: 0,
    viewportHeight: height,
    viewportWidth: width,
  })
  const outsideWalls = useMemo(
    () => getOutsideWallRuns(layout, roomLeft, outsideWallWidth, height),
    [height, layout, outsideWallWidth, roomLeft]
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

  useEffect(() => {
    cameraInputRef.current = {
      layoutHeight: layout.height,
      layoutWidth: layout.width,
      playerBottom: playerTop + sprite.height,
      playerCenterX: roomLeft + position.x + sprite.width / 2,
      viewportHeight: height,
      viewportWidth: width,
    }
  }, [
    height,
    layout.height,
    layout.width,
    playerTop,
    position.x,
    roomLeft,
    sprite.height,
    sprite.width,
    width,
  ])

  useEffect(() => {
    let frame: number
    let current = { x: 0, y: 0 }

    const tick = () => {
      const target = getPipeRoomCameraTarget(cameraInputRef.current)
      const next = {
        x: current.x + (target.x - current.x) * pipeRoomCameraLerp,
        y: current.y + (target.y - current.y) * pipeRoomCameraLerp,
      }
      const snapped = {
        x: Math.abs(next.x - target.x) < 0.5 ? target.x : next.x,
        y: Math.abs(next.y - target.y) < 0.5 ? target.y : next.y,
      }

      current = snapped
      setCamera((previous) =>
        Math.abs(previous.x - snapped.x) < 0.25 && Math.abs(previous.y - snapped.y) < 0.25
          ? previous
          : snapped
      )
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

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
      <Box
        position={'absolute'}
        inset={0}
        transform={`translate3d(${camera.x}px, ${camera.y}px, 0)`}
        willChange={'transform'}
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

          {layout.messageForm && (
            <PipeRoomMessageForm form={layout.messageForm} onCancel={onExit} />
          )}

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
            transition={
              exiting ? `top ${pipeRoomExitDelay}ms ease-in, left 120ms linear` : undefined
            }
          />
        </Box>
      </Box>

      <Footer animated={false} dark />
    </Box>
  )
}

export default PipeRoom
