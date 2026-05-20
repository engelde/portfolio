'use client'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

import { useAudio } from '@/hooks/useAudio'
import type { CeilingHit } from '@/hooks/useController'

import {
  brickSegments,
  coinSegments,
  collisionCeilings,
  collisionEdgeTolerance,
  goombaSegments,
  pipeSegments,
  turtleSegments,
} from '../level-map'
import Brick from './brick'
import Coin, { type CoinProps } from './coin'
import Goomba, { type GoombaProps } from './goomba'
import Leaf from './leaf'
import Mushroom from './mushroom'
import OneUp from './one-up'
import Pipe, { type PipeProps } from './pipe'
import PrizeBox, { type PrizeBoxProps } from './prize-box'
import Turtle, { type TurtleShellRoute } from './turtle'

// Wrap child components in React.memo for performance
const MemoizedBrick = React.memo(Brick)
const MemoizedCoin = React.memo(Coin)
const MemoizedGoomba = React.memo(Goomba)
const MemoizedLeaf = React.memo(Leaf)
const MemoizedMushroom = React.memo(Mushroom)
const MemoizedOneUp = React.memo(OneUp)
const MemoizedPipe = React.memo(Pipe)
const MemoizedPrizeBox = React.memo(PrizeBox)
const MemoizedTurtle = React.memo(Turtle)

export type ForegroundProps = {
  animationsPaused?: boolean
  down: boolean
  ceilingHit?: CeilingHit | null
  falling: boolean
  jump: boolean
  lives: number
  mario: 1 | 2 | 3
  marioOffset: number
  score: number
  xPos: number
  yPos: number
  destroyedBricks: Record<string, true>
  setLives: (lives: number) => void
  setMario: (variant: 1 | 2 | 3) => void
  setScore: Dispatch<SetStateAction<number>>
  onShellBrickHit: (id: string) => void
  onStomp?: () => void
}

type PrizeBoxState = {
  status: boolean
  active: boolean
  count: number
  prize: boolean
}

type DynamicObjectsState = {
  prizeBoxes: { [key: number]: PrizeBoxState }
  coins: { [key: number]: boolean }
  items: {
    leaf1: boolean
    mushroom1: boolean
    oneUp1: boolean
  }
}

type ShellDefeat = {
  signal: number
  x: number
}

const prizeBoxWidth = 80
const coinCollisionSize = 80
const coinCollectionOverlap = 24
const turtleTwoShellRoute: TurtleShellRoute = {
  points: [
    { x: 10480, y: 304 },
    { x: 10560, y: 64 },
    { brickId: 'brick-17', x: 10640, y: 64 },
    { brickId: 'brick-16', x: 10560, y: 64 },
    { brickId: 'brick-19', x: 10720, y: 64 },
    { brickId: 'brick-13', x: 10480, y: 64 },
  ],
  vanishOnComplete: true,
}
const turtleThreeShellRoute: TurtleShellRoute = {
  points: [
    { x: 6724, y: 544 },
    { x: 6644, y: 382 },
    { x: 6564, y: 382 },
    { x: 6485, y: 222 },
    { x: 6405, y: 222 },
    { x: 6325, y: 64 },
    { x: 5920, y: 64 },
    { x: 5800, y: -120 },
  ],
  vanishOnComplete: true,
}
const turtleShellRoutes: Record<string, TurtleShellRoute> = {
  'turtle-2': turtleTwoShellRoute,
  'turtle-3': turtleThreeShellRoute,
}

const getPrizeBoxIdsForOwner = (owner: string) => {
  const exactMatch = owner.match(/^prize-box-(\d+)$/)
  if (exactMatch) return [Number(exactMatch[1])]

  const groupMatch = owner.match(/^prize-boxes-([\d-]+)$/)
  if (!groupMatch) return []

  return groupMatch[1].split('-').map(Number)
}

const ceilingPrizeBoxIds = new Set(
  collisionCeilings.flatMap((ceiling) => getPrizeBoxIdsForOwner(ceiling.owner))
)

const createInitialCoinState = () =>
  coinSegments.reduce<{ [key: number]: boolean }>((state, coin) => {
    state[coin.id] = false
    return state
  }, {})

const getPrizeBoxCeilingOverlap = (item: PrizeBoxProps, ceilingHit: CeilingHit) =>
  Math.max(
    0,
    Math.min(item.x + prizeBoxWidth + collisionEdgeTolerance, ceilingHit.footprintRight) -
      Math.max(item.x - collisionEdgeTolerance, ceilingHit.footprintLeft)
  )

const getOverlap = (startA: number, endA: number, startB: number, endB: number) =>
  Math.min(endA, endB) - Math.max(startA, startB)

const Foreground = ({
  animationsPaused = false,
  down,
  ceilingHit,
  falling,
  jump,
  lives,
  mario,
  marioOffset,
  score,
  xPos,
  yPos,
  destroyedBricks,
  setLives,
  setMario,
  setScore,
  onShellBrickHit,
  onStomp,
}: ForegroundProps) => {
  const { playAudio } = useAudio()
  const processedCeilingHitRef = useRef<number | null>(null)
  const [defeatedGoombas, setDefeatedGoombas] = useState<Record<string, true>>({})
  const [shellDefeats, setShellDefeats] = useState<Record<string, ShellDefeat>>({})

  // Initial state for all dynamic objects
  const [dynamicObjects, setDynamicObjects] = useState<DynamicObjectsState>({
    prizeBoxes: {
      1: { status: true, active: false, count: 1, prize: false },
      2: { status: true, active: false, count: 1, prize: false },
      3: { status: true, active: false, count: 1, prize: false },
      4: { status: true, active: false, count: 1, prize: false },
      5: { status: true, active: false, count: 1, prize: false },
      6: { status: true, active: false, count: 1, prize: false },
      7: { status: true, active: false, count: 1, prize: false },
      8: { status: true, active: false, count: 1, prize: false },
      9: { status: true, active: false, count: 1, prize: false },
    },
    coins: createInitialCoinState(),
    items: {
      leaf1: false,
      mushroom1: false,
      oneUp1: false,
    },
  })

  // State update helpers
  const setPrizeBoxState = useCallback(
    <K extends keyof PrizeBoxState>(id: number, key: K, val: PrizeBoxState[K]) => {
      setDynamicObjects((prev) => ({
        ...prev,
        prizeBoxes: {
          ...prev.prizeBoxes,
          [id]: { ...prev.prizeBoxes[id], [key]: val },
        },
      }))
    },
    []
  )

  const setCoinActive = useCallback((id: number, active: boolean) => {
    setDynamicObjects((prev) => ({
      ...prev,
      coins: { ...prev.coins, [id]: active },
    }))
  }, [])

  const setItemActive = useCallback((key: keyof DynamicObjectsState['items'], active: boolean) => {
    setDynamicObjects((prev) => ({
      ...prev,
      items: { ...prev.items, [key]: active },
    }))
  }, [])

  // Create stable handlers for prize boxes and coins to ensure React.memo works
  const prizeBoxHandlers = useMemo(() => {
    const handlers: {
      [key: number]: {
        setStatus: (val: boolean) => void
        setActive: (val: boolean) => void
        setPrizeActive: (val: boolean) => void
        setPrizeCount: (val: number) => void
      }
    } = {}
    for (let i = 1; i <= 9; i++) {
      handlers[i] = {
        setStatus: (val: boolean) => setPrizeBoxState(i, 'status', val),
        setActive: (val: boolean) => setPrizeBoxState(i, 'active', val),
        setPrizeActive: (val: boolean) => setPrizeBoxState(i, 'prize', val),
        setPrizeCount: (val: number) => setPrizeBoxState(i, 'count', val),
      }
    }
    return handlers
  }, [setPrizeBoxState])

  const coinHandlers = useMemo(() => {
    const handlers: { [key: number]: (val: boolean) => void } = {}
    coinSegments.forEach(({ id }) => {
      handlers[id] = (val: boolean) => setCoinActive(id, val)
    })
    return handlers
  }, [setCoinActive])

  const itemHandlers = useMemo(() => {
    return {
      leaf1: (val: boolean) => setItemActive('leaf1', val),
      mushroom1: (val: boolean) => setItemActive('mushroom1', val),
      oneUp1: (val: boolean) => setItemActive('oneUp1', val),
    }
  }, [setItemActive])

  const triggerLeafPrizeBox = useCallback(() => {
    const leafBox = dynamicObjects.prizeBoxes[6]
    if (!leafBox?.status || leafBox.active || leafBox.count <= 0) return

    prizeBoxHandlers[6].setActive(true)
    prizeBoxHandlers[6].setPrizeActive(true)
    playAudio('box')
  }, [dynamicObjects.prizeBoxes, playAudio, prizeBoxHandlers])

  const markGoombaDefeated = useCallback((id: string) => {
    setDefeatedGoombas((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
  }, [])

  const handleShellGoombaHit = useCallback((id: string, shellX: number) => {
    setDefeatedGoombas((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
    setShellDefeats((prev) => ({
      ...prev,
      [id]: {
        signal: (prev[id]?.signal ?? 0) + 1,
        x: shellX,
      },
    }))
  }, [])

  const bricks = brickSegments.filter((brick) => !destroyedBricks[brick.id])

  const coins: (CoinProps & { id: number })[] = [
    ...coinSegments.map((coin) => ({
      ...coin,
      active: dynamicObjects.coins[coin.id],
      setActive: coinHandlers[coin.id],
      score: score,
      setScore: setScore,
    })),
  ]

  const goombas: GoombaProps[] = goombaSegments

  const pipes: PipeProps[] = pipeSegments.map(({ activeWhenBeforeX, ...pipe }) => ({
    ...pipe,
    ...(activeWhenBeforeX !== undefined && { active: xPos < activeWhenBeforeX }),
  }))

  const turtles = turtleSegments
  const shellTargets = useMemo(
    () => goombaSegments.filter((goomba) => !defeatedGoombas[goomba.id]),
    [defeatedGoombas]
  )

  const prizeBoxes = useMemo<PrizeBoxProps[]>(
    () => [
      {
        x: 1120,
        y: 304,
        status: dynamicObjects.prizeBoxes[1].status,
        setStatus: prizeBoxHandlers[1].setStatus,
        active: dynamicObjects.prizeBoxes[1].active,
        setActive: prizeBoxHandlers[1].setActive,
        prizeActive: dynamicObjects.prizeBoxes[1].prize,
        setPrizeActive: prizeBoxHandlers[1].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[1].count,
        setPrizeCount: prizeBoxHandlers[1].setPrizeCount,
        children: (
          <MemoizedCoin
            x={0}
            y={16}
            active={dynamicObjects.prizeBoxes[1].prize}
            animationsPaused={animationsPaused}
            setActive={prizeBoxHandlers[1].setPrizeActive}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 1200,
        y: 304,
        status: dynamicObjects.prizeBoxes[2].status,
        setStatus: prizeBoxHandlers[2].setStatus,
        active: dynamicObjects.prizeBoxes[2].active,
        setActive: prizeBoxHandlers[2].setActive,
        prizeActive: dynamicObjects.prizeBoxes[2].prize,
        setPrizeActive: prizeBoxHandlers[2].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[2].count,
        setPrizeCount: prizeBoxHandlers[2].setPrizeCount,
        children: (
          <MemoizedCoin
            x={0}
            y={16}
            active={dynamicObjects.prizeBoxes[2].prize}
            animationsPaused={animationsPaused}
            setActive={prizeBoxHandlers[2].setPrizeActive}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 1360,
        y: 544,
        status: dynamicObjects.prizeBoxes[3].status,
        setStatus: prizeBoxHandlers[3].setStatus,
        active: dynamicObjects.prizeBoxes[3].active,
        setActive: prizeBoxHandlers[3].setActive,
        prizeActive: dynamicObjects.prizeBoxes[3].prize,
        setPrizeActive: prizeBoxHandlers[3].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[3].count,
        setPrizeCount: prizeBoxHandlers[3].setPrizeCount,
        children: (
          <MemoizedCoin
            x={0}
            y={16}
            active={dynamicObjects.prizeBoxes[3].prize}
            animationsPaused={animationsPaused}
            setActive={prizeBoxHandlers[3].setPrizeActive}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 1440,
        y: 544,
        status: dynamicObjects.prizeBoxes[4].status,
        setStatus: prizeBoxHandlers[4].setStatus,
        active: dynamicObjects.prizeBoxes[4].active,
        setActive: prizeBoxHandlers[4].setActive,
        prizeActive: dynamicObjects.prizeBoxes[4].prize,
        setPrizeActive: prizeBoxHandlers[4].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[4].count,
        setPrizeCount: prizeBoxHandlers[4].setPrizeCount,
        children: (
          <MemoizedMushroom
            x={0}
            y={0}
            active={dynamicObjects.items.mushroom1}
            animationsPaused={animationsPaused}
            setActive={itemHandlers.mushroom1}
            mario={mario}
            setMario={setMario}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 2320,
        y: 464,
        status: dynamicObjects.prizeBoxes[5].status,
        setStatus: prizeBoxHandlers[5].setStatus,
        active: dynamicObjects.prizeBoxes[5].active,
        setActive: prizeBoxHandlers[5].setActive,
        prizeActive: dynamicObjects.prizeBoxes[5].prize,
        setPrizeActive: prizeBoxHandlers[5].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[5].count,
        setPrizeCount: prizeBoxHandlers[5].setPrizeCount,
        children: (
          <MemoizedCoin
            x={0}
            y={16}
            active={dynamicObjects.prizeBoxes[5].prize}
            animationsPaused={animationsPaused}
            setActive={prizeBoxHandlers[5].setPrizeActive}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 3520,
        y: 128,
        status: dynamicObjects.prizeBoxes[6].status,
        setStatus: prizeBoxHandlers[6].setStatus,
        active: dynamicObjects.prizeBoxes[6].active,
        setActive: prizeBoxHandlers[6].setActive,
        prizeActive: dynamicObjects.prizeBoxes[6].prize,
        setPrizeActive: prizeBoxHandlers[6].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[6].count,
        setPrizeCount: prizeBoxHandlers[6].setPrizeCount,
        children: (
          <MemoizedLeaf
            x={0}
            y={0}
            active={dynamicObjects.items.leaf1}
            animationsPaused={animationsPaused}
            setActive={itemHandlers.leaf1}
            mario={mario}
            setMario={setMario}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 3760,
        y: 288,
        status: dynamicObjects.prizeBoxes[7].status,
        setStatus: prizeBoxHandlers[7].setStatus,
        active: dynamicObjects.prizeBoxes[7].active,
        setActive: prizeBoxHandlers[7].setActive,
        prizeActive: dynamicObjects.prizeBoxes[7].prize,
        setPrizeActive: prizeBoxHandlers[7].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[7].count,
        setPrizeCount: prizeBoxHandlers[7].setPrizeCount,
        children: (
          <MemoizedCoin
            x={0}
            y={16}
            active={dynamicObjects.prizeBoxes[7].prize}
            animationsPaused={animationsPaused}
            setActive={prizeBoxHandlers[7].setPrizeActive}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 7520,
        y: 224,
        status: dynamicObjects.prizeBoxes[8].status,
        setStatus: prizeBoxHandlers[8].setStatus,
        active: dynamicObjects.prizeBoxes[8].active,
        setActive: prizeBoxHandlers[8].setActive,
        prizeActive: dynamicObjects.prizeBoxes[8].prize,
        setPrizeActive: prizeBoxHandlers[8].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[8].count,
        setPrizeCount: prizeBoxHandlers[8].setPrizeCount,
        children: (
          <MemoizedCoin
            x={0}
            y={16}
            active={dynamicObjects.prizeBoxes[8].prize}
            animationsPaused={animationsPaused}
            setActive={prizeBoxHandlers[8].setPrizeActive}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 7360,
        y: 1344,
        status: dynamicObjects.prizeBoxes[9].status,
        setStatus: prizeBoxHandlers[9].setStatus,
        active: dynamicObjects.prizeBoxes[9].active,
        setActive: prizeBoxHandlers[9].setActive,
        prizeActive: dynamicObjects.prizeBoxes[9].prize,
        setPrizeActive: prizeBoxHandlers[9].setPrizeActive,
        prizeCount: dynamicObjects.prizeBoxes[9].count,
        setPrizeCount: prizeBoxHandlers[9].setPrizeCount,
        children: (
          <MemoizedOneUp
            x={0}
            y={0}
            active={dynamicObjects.items.oneUp1}
            animationsPaused={animationsPaused}
            lives={lives}
            setActive={itemHandlers.oneUp1}
            setLives={setLives}
          />
        ),
      },
    ],
    [
      dynamicObjects,
      animationsPaused,
      mario,
      lives,
      score,
      setLives,
      setMario,
      setScore,
      itemHandlers,
      prizeBoxHandlers,
    ]
  )

  const prizeInteractions = useMemo(
    () => [
      {
        xRange: [1690, 1790],
        yRange: [440, 540],
        boxStatus: dynamicObjects.prizeBoxes[4].prize,
        prizeStatus: dynamicObjects.items.mushroom1,
        setPrizeStatus: itemHandlers.mushroom1,
      },
      {
        xRange: [3460, 3560],
        yRange: [444, 524],
        boxStatus: dynamicObjects.prizeBoxes[6].prize,
        prizeStatus: dynamicObjects.items.leaf1,
        setPrizeStatus: itemHandlers.leaf1,
      },
      {
        xRange: [5540, 5640],
        yRange: [304, 384],
        boxStatus: !dynamicObjects.coins[1],
        prizeStatus: dynamicObjects.coins[1],
        setPrizeStatus: coinHandlers[1],
      },
      {
        xRange: [5700, 5800],
        yRange: [464, 544],
        boxStatus: !dynamicObjects.coins[2],
        prizeStatus: dynamicObjects.coins[2],
        setPrizeStatus: coinHandlers[2],
      },
      {
        xRange: [5860, 5960],
        yRange: [624, 704],
        boxStatus: !dynamicObjects.coins[3],
        prizeStatus: dynamicObjects.coins[3],
        setPrizeStatus: coinHandlers[3],
      },
      {
        xRange: [6020, 6120],
        yRange: [784, 864],
        boxStatus: !dynamicObjects.coins[4],
        prizeStatus: dynamicObjects.coins[4],
        setPrizeStatus: coinHandlers[4],
      },
      {
        xRange: [6180, 6280],
        yRange: [944, 1024],
        boxStatus: !dynamicObjects.coins[5],
        prizeStatus: dynamicObjects.coins[5],
        setPrizeStatus: coinHandlers[5],
      },
      {
        xRange: [7320, 7420],
        yRange: [1344, 1444],
        boxStatus: dynamicObjects.prizeBoxes[9].prize,
        prizeStatus: dynamicObjects.items.oneUp1,
        setPrizeStatus: itemHandlers.oneUp1,
      },
    ],
    [dynamicObjects, coinHandlers, itemHandlers]
  )

  const triggerPrizeBox = useCallback((item: PrizeBoxProps) => {
    if (item.active) return

    item.setActive(true)
    if (item.prizeCount > 0) {
      item.setPrizeActive(true)
    }
  }, [])

  useEffect(() => {
    const playerWidth = mario === 3 ? 120 : mario === 2 ? 80 : 100
    const playerHeight = mario === 1 ? 100 : 160
    const playerLeft = xPos + (mario === 3 ? -24 : 0) + 8
    const playerRight = playerLeft + playerWidth - 16
    const playerBottom = yPos + 8
    const playerTop = yPos + playerHeight - 8

    coinSegments.forEach((coin) => {
      if (dynamicObjects.coins[coin.id]) return

      const coinBottom = coin.y + 80
      const horizontalOverlap = getOverlap(
        playerLeft,
        playerRight,
        coin.x,
        coin.x + coinCollisionSize
      )
      const verticalOverlap = getOverlap(
        playerBottom,
        playerTop,
        coinBottom,
        coinBottom + coinCollisionSize
      )

      if (horizontalOverlap >= coinCollectionOverlap && verticalOverlap >= coinCollectionOverlap) {
        coinHandlers[coin.id]?.(true)
      }
    })
  }, [coinHandlers, dynamicObjects.coins, mario, xPos, yPos])

  // Prize Box interactions from physical ceiling collisions
  useEffect(() => {
    if (!ceilingHit) return
    if (processedCeilingHitRef.current === ceilingHit.signal) return

    processedCeilingHitRef.current = ceilingHit.signal

    const ownerIds = getPrizeBoxIdsForOwner(ceilingHit.owner)
    if (ownerIds.length === 0) return

    const hitBox = prizeBoxes
      .map((item, index) => {
        const id = index + 1
        return {
          item,
          overlap: ownerIds.includes(id) ? getPrizeBoxCeilingOverlap(item, ceilingHit) : 0,
        }
      })
      .filter(({ overlap }) => overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)[0]?.item

    if (hitBox) {
      triggerPrizeBox(hitBox)
    }
  }, [ceilingHit, prizeBoxes, triggerPrizeBox])

  // Fallback for prize boxes that do not have a collision ceiling entry
  useEffect(() => {
    if (jump) {
      prizeBoxes.forEach((item, index) => {
        if (ceilingPrizeBoxIds.has(index + 1)) return

        if (
          xPos > item.x - 55 &&
          xPos < item.x + 45 &&
          yPos >= item.y - 100 - (mario !== 1 ? marioOffset : 0) &&
          yPos < item.y
        ) {
          triggerPrizeBox(item)
        }
      })
    }
  }, [jump, mario, marioOffset, prizeBoxes, triggerPrizeBox, xPos, yPos])

  // Down arrow over the leaf prize box releases the leaf
  useEffect(() => {
    if (!down) return
    const leafBox = prizeBoxes.find((b) => b.x === 3520 && b.y === 128)
    if (!leafBox) return
    if (leafBox.active || !leafBox.status || leafBox.prizeCount === 0) return
    // Standing on top of the box (platform top at y=208 from useSettings)
    if (xPos > 3460 && xPos < 3570 && yPos >= 200 && yPos <= 240) {
      leafBox.setActive(true)
      leafBox.setPrizeActive(true)
      playAudio('stomp')
    }
  }, [down, playAudio, prizeBoxes, xPos, yPos])

  // Prize interactions
  useEffect(() => {
    prizeInteractions.forEach((item) => {
      if (
        item.xRange[0] &&
        item.xRange[1] &&
        item.yRange[0] &&
        item.yRange[1] &&
        xPos > item.xRange[0] &&
        xPos < item.xRange[1] &&
        yPos >= item.yRange[0] - (mario !== 1 ? marioOffset : 0) &&
        yPos < item.yRange[1]
      ) {
        if (item.boxStatus && !item.prizeStatus) {
          item.setPrizeStatus(true)
        }
      }
    })
  }, [mario, marioOffset, prizeInteractions, xPos, yPos])

  return (
    <>
      {bricks.map((item) => (
        <MemoizedBrick key={item.id} id={item.id} x={item.x} y={item.y} />
      ))}

      {coins.map((item) => (
        <MemoizedCoin
          key={item.id}
          x={item.x}
          y={item.y}
          show={true}
          clickable={true}
          active={item.active}
          animationsPaused={animationsPaused}
          setActive={item.setActive}
          score={score}
          setScore={setScore}
        />
      ))}

      {goombas.map((item, x) => (
        <MemoizedGoomba
          key={x}
          id={item.id}
          animationsPaused={animationsPaused}
          x={item.x}
          y={item.y}
          offset={item.offset}
          falling={falling}
          xPos={xPos}
          yPos={yPos}
          setScore={setScore}
          onStomp={onStomp}
          onDefeat={markGoombaDefeated}
          shellDefeat={item.id ? shellDefeats[item.id] : undefined}
        />
      ))}

      {pipes.map((item, x) => (
        <MemoizedPipe
          key={x}
          xPos={xPos}
          yPos={yPos}
          x={item.x}
          y={item.y}
          height={item.height}
          animationsPaused={animationsPaused}
          falling={falling}
          {...(item.plant && { plant: item.plant })}
          {...(item.plantVariant && { plantVariant: item.plantVariant })}
          active={item.active}
          setScore={setScore}
          onStomp={onStomp}
        />
      ))}

      {prizeBoxes.map((item, x) => (
        <MemoizedPrizeBox
          key={x}
          x={item.x}
          y={item.y}
          status={item.status}
          setStatus={item.setStatus}
          active={item.active}
          setActive={item.setActive}
          prizeActive={item.prizeActive}
          setPrizeActive={item.setPrizeActive}
          prizeCount={item.prizeCount}
          setPrizeCount={item.setPrizeCount}
          animationsPaused={animationsPaused}
        >
          {item.children}
        </MemoizedPrizeBox>
      ))}

      {turtles.map((item, x) => {
        const shellRoute = turtleShellRoutes[item.id]

        return (
          <MemoizedTurtle
            key={x}
            animationsPaused={animationsPaused}
            x={item.x}
            y={item.y}
            offset={item.offset}
            falling={falling}
            xPos={xPos}
            yPos={yPos}
            variant={item.variant}
            setScore={setScore}
            onStomp={onStomp}
            onShellBrickHit={onShellBrickHit}
            onShellPrizeHit={shellRoute ? undefined : triggerLeafPrizeBox}
            onShellGoombaHit={shellRoute ? undefined : handleShellGoombaHit}
            shellRoute={shellRoute}
            shellTargets={shellRoute ? [] : shellTargets}
          />
        )
      })}
    </>
  )
}

export default Foreground
