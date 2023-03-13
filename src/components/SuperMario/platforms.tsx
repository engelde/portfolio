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
    xMin: 1540,
    xMax: 1800,
    height: 396 + smGroundHeight,
  },
  {
    xMin: 1380,
    xMax: 1640,
    height: 236 + smGroundHeight,
  },
  // pipe 1
  {
    xMin: 1940,
    xMax: 2120,
    height: 236 + smGroundHeight,
  },
  // cube 2
  {
    xMin: 2740,
    xMax: 3080,
    height: 560 + smGroundHeight,
  },
  {
    xMin: 2500,
    xMax: 2840,
    height: 396 + smGroundHeight,
  },
  {
    xMin: 2180,
    xMax: 2615,
    height: 236 + smGroundHeight,
  },
  {
    xMin: 2730,
    xMax: 3260,
    height: 158 + smGroundHeight,
  },
  // box set 4
  {
    xMin: 3460,
    xMax: 3570,
    height: 80 + lgGroundHeight,
  },
  // box set 5
  {
    xMin: 3700,
    xMax: 3810,
    height: 240 + lgGroundHeight,
  },
  // cube 3
  {
    xMin: 6740,
    xMax: 7330,
    height: 480 + smGroundHeight,
  },
  {
    xMin: 6580,
    xMax: 7180,
    height: 318 + smGroundHeight,
  },
  {
    xMin: 6420,
    xMax: 7010,
    height: 158 + smGroundHeight,
  },
  // box set 6
  {
    xMin: 7460,
    xMax: 7570,
    height: 240 + smGroundHeight,
  },
  // rock set 1
  {
    xMin: 7620,
    xMax: 7810,
    height: 400 + smGroundHeight,
  },
  // pipe 2
  {
    xMin: 9140,
    xMax: 9330,
    height: 160 + smGroundHeight,
  },
  // pipe 3
  {
    xMin: 9460,
    xMax: 9650,
    height: 240 + smGroundHeight,
  },
  // pipe 4
  {
    xMin: 12880,
    xMax: 13320,
    height: 151 + smGroundHeight,
  },
]
