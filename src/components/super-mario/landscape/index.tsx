'use client'

import React from 'react'

import { cubeSegments, groundSegments, rockSegments } from '../level-map'
import Bush, { type BushProps } from './bush'
import Cloud, { type CloudProps } from './cloud'
import Cube, { type CubeProps } from './cube'
import Ground, { type GroundProps } from './ground'
import Rock, { type RockProps } from './rock'
import Tree, { type TreeProps } from './tree'

const MemoizedBush = React.memo(Bush)
const MemoizedCloud = React.memo(Cloud)
const MemoizedCube = React.memo(Cube)
const MemoizedGround = React.memo(Ground)
const MemoizedRock = React.memo(Rock)
const MemoizedTree = React.memo(Tree)

const Landscape = () => {
  const bushes: BushProps[] = [
    { x: 1040, y: 64 },
    { x: 1120, y: 64 },
    { x: 1200, y: 64 },
    { x: 3600, y: 128 },
    { x: 3680, y: 128 },
    { x: 3760, y: 128 },
    { x: 3840, y: 128 },
    { x: 3920, y: 128 },
    { x: 4000, y: 128 },
    { x: 5440, y: 128 },
    { x: 5520, y: 128 },
    { x: 6080, y: 64 },
    { x: 6160, y: 64 },
    { x: 6240, y: 64 },
    { x: 8800, y: 64 },
    { x: 8880, y: 64 },
    { x: 8960, y: 64 },
  ]

  const clouds: CloudProps[] = [
    { x: 7200, y: 1024 },
    { x: 7280, y: 1024 },
    { x: 7360, y: 1024 },
    { x: 7440, y: 1024 },
    { x: 7600, y: 1104 },
    { x: 7680, y: 1104 },
    { x: 7760, y: 1104 },
    { x: 7840, y: 1104 },
    { x: 7920, y: 1104 },
    { x: 8000, y: 1104 },
    { x: 8080, y: 1104 },
    { x: 8160, y: 1104 },
    { x: 8240, y: 1104 },
    { x: 8320, y: 1104 },
    { x: 8400, y: 1104 },
    { x: 8480, y: 1104 },
    { x: 8560, y: 1104 },
  ]

  const cubes: CubeProps[] = cubeSegments

  const grounds: GroundProps[] = groundSegments

  const rocks: RockProps[] = rockSegments

  const trees: TreeProps[] = [
    { variant: 2, x: 320, y: 64 },
    { variant: 2, x: 4320, y: 128 },
    { variant: 1, x: 4960, y: 128 },
    { variant: 1, x: 9680, y: 64 },
    { variant: 3, x: 12080, y: 64 },
  ]

  return (
    <>
      {bushes.map((item, x) => (
        <MemoizedBush key={x} x={item.x} y={item.y} />
      ))}

      {clouds.map((item, x) => (
        <MemoizedCloud key={x} x={item.x} y={item.y} />
      ))}

      {cubes.map((item, x) => (
        <MemoizedCube key={x} variant={item.variant} x={item.x} y={item.y} />
      ))}

      {grounds.map((item, x) => (
        <MemoizedGround key={x} x={item.x} width={item.width} height={item.height} />
      ))}

      {rocks.map((item, x) => (
        <MemoizedRock key={x} x={item.x} y={item.y} />
      ))}

      {trees.map((item, x) => (
        <MemoizedTree key={x} variant={item.variant} x={item.x} y={item.y} />
      ))}
    </>
  )
}

export default Landscape
