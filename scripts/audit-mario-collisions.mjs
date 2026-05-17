#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const levelMapPath = resolve(root, 'src/components/super-mario/level-map.json')
const levelMap = JSON.parse(readFileSync(levelMapPath, 'utf8'))

const failures = []
const warnings = []

const assertUnique = (label, items, getId = (item) => item.id) => {
  const seen = new Set()
  for (const item of items) {
    const id = getId(item)
    if (!id) failures.push(`${label} has an item without an id`)
    if (seen.has(id)) failures.push(`${label} has duplicate id "${id}"`)
    seen.add(id)
  }
}

assertUnique('grounds', levelMap.grounds)
assertUnique('cubes', levelMap.cubes)
assertUnique('rocks', levelMap.rocks)
assertUnique('bricks', levelMap.bricks)
assertUnique('pipes', levelMap.pipes)
assertUnique('goombas', levelMap.goombas)
assertUnique('turtles', levelMap.turtles)
assertUnique('collision surfaces', levelMap.collisionSurfaces)
assertUnique('collision ceilings', levelMap.collisionCeilings)

for (const surface of levelMap.collisionSurfaces) {
  if (surface.xMin >= surface.xMax) {
    failures.push(`${surface.id} has invalid x range ${surface.xMin}..${surface.xMax}`)
  }
  if (surface.height < 0) {
    failures.push(`${surface.id} has negative height ${surface.height}`)
  }
}

for (const ceiling of levelMap.collisionCeilings) {
  if (ceiling.xMin >= ceiling.xMax) {
    failures.push(`${ceiling.id} has invalid x range ${ceiling.xMin}..${ceiling.xMax}`)
  }
  if (ceiling.height < 0) {
    failures.push(`${ceiling.id} has negative height ${ceiling.height}`)
  }
}

for (const ground of levelMap.grounds) {
  const ownerSurface = levelMap.collisionSurfaces.find((surface) => surface.owner === ground.id)
  if (!ownerSurface) warnings.push(`${ground.id} has no collision surface owner`)
}

for (const pipe of levelMap.pipes.filter((pipe) => pipe.collisionTop !== false)) {
  const ownerSurface = levelMap.collisionSurfaces.find((surface) => surface.owner === pipe.id)
  if (!ownerSurface) warnings.push(`${pipe.id} has no top collision surface`)
}

for (const box of levelMap.prizeBoxes) {
  const owner = `prize-box-${box.id}`
  const groupedOwner = levelMap.collisionSurfaces.some((surface) => {
    if (!surface.owner.startsWith('prize-boxes-')) return false
    return surface.owner.replace('prize-boxes-', '').split('-').includes(String(box.id))
  })
  const directOwner = levelMap.collisionSurfaces.some((surface) => surface.owner === owner)
  if (!groupedOwner && !directOwner) warnings.push(`${owner} has no top collision surface`)
}

const surfaceRows = levelMap.collisionSurfaces
  .map(
    (surface) =>
      `| ${surface.id} | ${surface.owner} | ${surface.kind} | ${surface.xMin}-${surface.xMax} | ${surface.height} |`
  )
  .join('\n')

const ceilingRows = levelMap.collisionCeilings
  .map(
    (ceiling) =>
      `| ${ceiling.id} | ${ceiling.owner} | ${ceiling.xMin}-${ceiling.xMax} | ${ceiling.height} |`
  )
  .join('\n')

const markdown = `# Super Mario Collision Audit

Source: \`src/components/super-mario/level-map.json\`

## Summary

- Collision surfaces: ${levelMap.collisionSurfaces.length}
- Collision ceilings: ${levelMap.collisionCeilings.length}
- Visual grounds: ${levelMap.grounds.length}
- Visual cubes: ${levelMap.cubes.length}
- Visual rocks: ${levelMap.rocks.length}
- Visual bricks: ${levelMap.bricks.length}
- Visual pipes: ${levelMap.pipes.length}
- Prize boxes: ${levelMap.prizeBoxes.length}

## Surface Inventory

| ID | Owner | Kind | X Range | Height |
| --- | --- | --- | --- | --- |
${surfaceRows}

## Ceiling Inventory

| ID | Owner | X Range | Height |
| --- | --- | --- | --- |
${ceilingRows}

## Audit Notes

- Mario support is based on foot-hitbox overlap against this inventory.
- A surface supports Mario while at least half of the active foot hitbox overlaps it.
- The same inventory drives keyboard movement, scroll movement, falling, and landing.
`

if (process.argv.includes('--markdown')) {
  console.log(markdown)
} else {
  console.log(
    JSON.stringify(
      {
        ceilings: levelMap.collisionCeilings.length,
        failures,
        surfaces: levelMap.collisionSurfaces.length,
        warnings,
      },
      null,
      2
    )
  )
}

if (failures.length > 0) process.exit(1)
