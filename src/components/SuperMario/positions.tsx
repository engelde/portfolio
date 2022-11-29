type PositionType = {
  xMin: number
  xMax: number
  height: number
}

type PositionUpdateType = {
  xPos: number
  yPos: number
  xOffset: number
  yOffset: number
  setY: (y: number) => void
  setYOffset: (yOffset: number) => void
  positions: PositionType[]
}

export const PositionUpdate = ({
  xPos,
  yPos,
  xOffset,
  yOffset,
  setY,
  setYOffset,
  positions,
}: PositionUpdateType): boolean => {
  for (let i of positions) {
    if (xPos + xOffset > i.xMin && xPos + xOffset < i.xMax) {
      if (yPos !== i.height) {
        setYOffset(yPos + yOffset - i.height > 0 ? yPos + yOffset - i.height : 0)
        setY(i.height)
      }
      return true
    }
  }
  return false
}

const smGroundHeight = 64
const lgGroundHeight = 128

export const positions = [
  {
    xMin: 0,
    xMax: 3272,
    height: smGroundHeight,
  },
  {
    xMin: 3272,
    xMax: 5800,
    height: lgGroundHeight,
  },
  {
    xMin: 5800,
    xMax: 7620,
    height: smGroundHeight,
  },
  {
    xMin: 7620,
    xMax: 7820,
    height: 144,
  },
  {
    xMin: 7820,
    xMax: 7920,
    height: smGroundHeight,
  },
  {
    xMin: 7920,
    xMax: 8000,
    height: 144,
  },
  {
    xMin: 8000,
    xMax: 8080,
    height: 224,
  },
  {
    xMin: 8080,
    xMax: 8220,
    height: 304,
  },
  {
    xMin: 8220,
    xMax: 8400,
    height: 384,
  },
  {
    xMin: 8400,
    xMax: 8560,
    height: 304,
  },
  {
    xMin: 8560,
    xMax: 8640,
    height: 224,
  },
  {
    xMin: 8640,
    xMax: 8720,
    height: 144,
  },
  {
    xMin: 8720,
    xMax: 9940,
    height: smGroundHeight,
  },
  {
    xMin: 9940,
    xMax: 10020,
    height: 144,
  },
  {
    xMin: 10020,
    xMax: 10100,
    height: 224,
  },
  {
    xMin: 10100,
    xMax: 10500,
    height: 304,
  },
  {
    xMin: 10500,
    xMax: 10620,
    height: 384,
  },
  {
    xMin: 10620,
    xMax: 10800,
    height: 444,
  },
  {
    xMin: 10800,
    xMax: 10920,
    height: 384,
  },
  {
    xMin: 10920,
    xMax: 11200,
    height: 324,
  },
  {
    xMin: 11200,
    xMax: 11240,
    height: 384,
  },
  {
    xMin: 11240,
    xMax: 11460,
    height: 424,
  },
  {
    xMin: 11460,
    xMax: 11540,
    height: 384,
  },
  {
    xMin: 11540,
    xMax: 11820,
    height: 304,
  },
  {
    xMin: 11820,
    xMax: 12120,
    height: 224,
  },
  {
    xMin: 12120,
    xMax: 15000,
    height: smGroundHeight,
  },
]
