import { FC } from 'react'
import Bush, { type BushProps } from './Bush'
import Cube, { type CubeProps } from './Cube'
import Ground, { type GroundProps } from './Ground'
import Rock, { type RockProps } from './Rock'
import Tree, { type TreeProps } from './Tree'

const Landscape: FC = () => {
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

  const cubes: CubeProps[] = [
    { variant: 1, x: 1440, y: 64 },
    { variant: 2, x: 2240, y: 64 },
    { variant: 3, x: 6480, y: 64 },
    { variant: 4, x: 10960, y: 64 },
  ]

  const grounds: GroundProps[] = [
    { x: 0, width: 3374, height: 64 },
    { x: 3360, width: 2320, height: 128 },
    { x: 5920, width: 1760, height: 64 },
    { x: 7840, width: 400, height: 64 },
    { x: 8480, width: 2960, height: 64 },
    { x: 11520, width: 9000, height: 64 },
  ]

  const rocks: RockProps[] = [
    { x: 7680, y: 384 },
    { x: 7760, y: 384 },
    { x: 8000, y: 64 },
    { x: 8080, y: 64 },
    { x: 8080, y: 144 },
    { x: 8160, y: 64 },
    { x: 8160, y: 144 },
    { x: 8160, y: 224 },
    { x: 8480, y: 64 },
    { x: 8480, y: 144 },
    { x: 8480, y: 224 },
    { x: 8560, y: 64 },
    { x: 8560, y: 144 },
    { x: 8640, y: 64 },
    { x: 11520, y: 224 },
    { x: 11600, y: 224 },
    { x: 11520, y: 544 },
    { x: 11600, y: 544 },
  ]

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
        <Bush key={x} x={item.x} y={item.y} />
      ))}

      {cubes.map((item, x) => (
        <Cube key={x} variant={item.variant} x={item.x} y={item.y} />
      ))}

      {grounds.map((item, x) => (
        <Ground key={x} x={item.x} width={item.width} height={item.height} />
      ))}

      {rocks.map((item, x) => (
        <Rock key={x} x={item.x} y={item.y} />
      ))}

      {trees.map((item, x) => (
        <Tree key={x} variant={item.variant} x={item.x} y={item.y} />
      ))}
    </>
  )
}

export default Landscape
