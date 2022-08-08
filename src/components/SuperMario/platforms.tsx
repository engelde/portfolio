type PlatformType = {
  xMin: number
  xMax: number
  height: number
}

type PlatformUpdateType = {
  xPos: number
  yPos: number
  xOffset: number
  yOffset: number
  ySpeed: number
  setY: (y: number) => void
  setYOffset: (yOffset: number) => void
  platforms: PlatformType[]
}

export const PlatformUpdate = ({
  xPos,
  yPos,
  xOffset,
  yOffset,
  ySpeed,
  setY,
  setYOffset,
  platforms,
}: PlatformUpdateType): boolean => {
  for (let i of platforms) {
    if (xPos + xOffset > i.xMin && xPos + xOffset < i.xMax && yPos + yOffset >= i.height - ySpeed) {
      if (yPos !== i.height) {
        setYOffset(yPos + yOffset - i.height - ySpeed > 0 ? yPos + yOffset - i.height - ySpeed : 0)
        setY(i.height)
      }
      return true
    }
  }
  return false
}

const smGroundHeight = 64
const lgGroundHeight = 128

export const platforms = [
  // box set 1
  {
    xMin: 1060,
    xMax: 1240,
    height: 320 + smGroundHeight,
  },
  // box set 2
  {
    xMin: 1300,
    xMax: 1480,
    height: 560 + smGroundHeight,
  },
  // cube 1
  {
    xMin: 1550,
    xMax: 1790,
    height: 396 + smGroundHeight,
  },
  {
    xMin: 1380,
    xMax: 1620,
    height: 236 + smGroundHeight,
  },
  // pipe 1
  {
    xMin: 1960,
    xMax: 2140,
    height: 236 + smGroundHeight,
  },
  // cube 2
  {
    xMin: 2740,
    xMax: 3100,
    height: 560 + smGroundHeight,
  },
  {
    xMin: 2500,
    xMax: 2860,
    height: 396 + smGroundHeight,
  },
  {
    xMin: 2200,
    xMax: 2600,
    height: 236 + smGroundHeight,
  },
  {
    xMin: 2740,
    xMax: 3260,
    height: 158 + smGroundHeight,
  },
  // box set 3
  {
    xMin: 3440,
    xMax: 3540,
    height: 80 + lgGroundHeight,
  },
  // box set 4
  {
    xMin: 3720,
    xMax: 3820,
    height: 240 + lgGroundHeight,
  },
  // cube 3
  {
    xMin: 6780,
    xMax: 7340,
    height: 480 + smGroundHeight,
  },
  {
    xMin: 6620,
    xMax: 7180,
    height: 318 + smGroundHeight,
  },
  {
    xMin: 6460,
    xMax: 7000,
    height: 158 + smGroundHeight,
  },
  {
    xMin: 7460,
    xMax: 7560,
    height: 240 + smGroundHeight,
  },
]
