import { FC, useEffect, useMemo, useState } from 'react'
import Brick, { type BrickProps } from './Brick'
import Coin, { type CoinProps } from './Coin'
import Goomba, { type GoombaProps } from './Goomba'
import Leaf from './Leaf'
import Mushroom from './Mushroom'
import OneUp from './OneUp'
import Pipe, { type PipeProps } from './Pipe'
import PrizeBox, { type PrizeBoxProps } from './PrizeBox'
import Turtle, { type TurtleProps } from './Turtle'

export type ForegroundProps = {
  jump: boolean
  lives: number
  mario: 1 | 2 | 3
  marioOffset: number
  score: number
  xPos: number
  yPos: number
  setLives: (lives: number) => void
  setMario: (variant: 1 | 2 | 3) => void
  setScore: (score: number) => void
}

const Foreground: FC<ForegroundProps> = ({
  jump,
  lives,
  mario,
  marioOffset,
  score,
  xPos,
  yPos,
  setLives,
  setMario,
  setScore,
}: ForegroundProps) => {
  const [prizeBox1Status, setPrizeBox1Status] = useState(true)
  const [prizeBox1Active, setPrizeBox1Active] = useState(false)
  const [prizeBox1Count, setPrizeBox1Count] = useState(1)
  const [prizeBox1Prize, setPrizeBox1Prize] = useState(false)

  const [prizeBox2Status, setPrizeBox2Status] = useState(true)
  const [prizeBox2Active, setPrizeBox2Active] = useState(false)
  const [prizeBox2Count, setPrizeBox2Count] = useState(1)
  const [prizeBox2Prize, setPrizeBox2Prize] = useState(false)

  const [prizeBox3Status, setPrizeBox3Status] = useState(true)
  const [prizeBox3Active, setPrizeBox3Active] = useState(false)
  const [prizeBox3Count, setPrizeBox3Count] = useState(1)
  const [prizeBox3Prize, setPrizeBox3Prize] = useState(false)

  const [prizeBox4Status, setPrizeBox4Status] = useState(true)
  const [prizeBox4Active, setPrizeBox4Active] = useState(false)
  const [prizeBox4Count, setPrizeBox4Count] = useState(1)
  const [prizeBox4Prize, setPrizeBox4Prize] = useState(false)

  const [prizeBox5Status, setPrizeBox5Status] = useState(true)
  const [prizeBox5Active, setPrizeBox5Active] = useState(false)
  const [prizeBox5Count, setPrizeBox5Count] = useState(1)
  const [prizeBox5Prize, setPrizeBox5Prize] = useState(false)

  const [prizeBox6Status, setPrizeBox6Status] = useState(true)
  const [prizeBox6Active, setPrizeBox6Active] = useState(false)
  const [prizeBox6Count, setPrizeBox6Count] = useState(1)
  const [prizeBox6Prize, setPrizeBox6Prize] = useState(false)

  const [prizeBox7Status, setPrizeBox7Status] = useState(true)
  const [prizeBox7Active, setPrizeBox7Active] = useState(false)
  const [prizeBox7Count, setPrizeBox7Count] = useState(1)
  const [prizeBox7Prize, setPrizeBox7Prize] = useState(false)

  const [prizeBox8Status, setPrizeBox8Status] = useState(true)
  const [prizeBox8Active, setPrizeBox8Active] = useState(false)
  const [prizeBox8Count, setPrizeBox8Count] = useState(1)
  const [prizeBox8Prize, setPrizeBox8Prize] = useState(false)

  const [prizeBox9Status, setPrizeBox9Status] = useState(true)
  const [prizeBox9Active, setPrizeBox9Active] = useState(false)
  const [prizeBox9Count, setPrizeBox9Count] = useState(1)
  const [prizeBox9Prize, setPrizeBox9Prize] = useState(false)

  const [coin1Active, setCoin1Active] = useState(false)
  const [coin2Active, setCoin2Active] = useState(false)
  const [coin3Active, setCoin3Active] = useState(false)
  const [coin4Active, setCoin4Active] = useState(false)
  const [coin5Active, setCoin5Active] = useState(false)

  const [leaf1Active, setLeaf1Active] = useState(false)
  const [mushroom1Active, setMushroom1Active] = useState(false)
  const [oneUp1Active, setOneUp1Active] = useState(false)

  const bricks: BrickProps[] = [
    { x: 10000, y: 64 },
    { x: 10080, y: 64 },
    { x: 10080, y: 144 },
    { x: 10160, y: 64 },
    { x: 10160, y: 144 },
    { x: 10160, y: 224 },
    { x: 10240, y: 64 },
    { x: 10240, y: 144 },
    { x: 10240, y: 224 },
    { x: 10320, y: 64 },
    { x: 10320, y: 144 },
    { x: 10320, y: 224 },
    { x: 10400, y: 64 },
    { x: 10400, y: 144 },
    { x: 10400, y: 224 },
    { x: 10480, y: 64 },
    { x: 10720, y: 64 },
    { x: 10720, y: 144 },
    { x: 10800, y: 64 },
  ]

  const coins: CoinProps[] = [
    {
      x: 5600,
      y: 308,
      active: coin1Active,
      setActive: setCoin1Active,
      score: score,
      setScore: setScore,
    },
    {
      x: 5760,
      y: 468,
      active: coin2Active,
      setActive: setCoin2Active,
      score: score,
      setScore: setScore,
    },
    {
      x: 5920,
      y: 628,
      active: coin3Active,
      setActive: setCoin3Active,
      score: score,
      setScore: setScore,
    },
    {
      x: 6080,
      y: 788,
      active: coin4Active,
      setActive: setCoin4Active,
      score: score,
      setScore: setScore,
    },
    {
      x: 6240,
      y: 948,
      active: coin5Active,
      setActive: setCoin5Active,
      score: score,
      setScore: setScore,
    },
  ]

  const goombas: GoombaProps[] = [
    { x: 1920, y: 64, offset: 1200 },
    { x: 3280, y: 64, offset: 1120 },
    { x: 4800, y: 128, offset: 1200 },
    { x: 5600, y: 128, offset: 2000 },
  ]

  const pipes: PipeProps[] = [
    {
      x: 2000,
      y: 64,
      height: 240,
      plant: true,
      plantVariant: 2,
      active: true,
    },
    {
      x: 9200,
      y: 64,
      height: 160,
      plant: true,
      plantVariant: 1,
    },
    {
      x: 9520,
      y: 64,
      height: 240,
      plant: true,
      plantVariant: 2,
      active: xPos < 9600,
    },
    { x: 11520, y: 64, height: 240 },
    { x: 11520, y: 624, height: 1120 },
    { x: 11520, y: 544, height: 80 },
    { x: 11840, y: 64, height: 160 },
  ]

  const turtles: TurtleProps[] = [{ x: 3200, y: 224, offset: 400 }]

  const prizeBoxes = useMemo<PrizeBoxProps[]>(
    () => [
      {
        x: 1120,
        y: 304,
        status: prizeBox1Status,
        setStatus: setPrizeBox1Status,
        active: prizeBox1Active,
        setActive: setPrizeBox1Active,
        prizeActive: prizeBox1Prize,
        setPrizeActive: setPrizeBox1Prize,
        prizeCount: prizeBox1Count,
        setPrizeCount: setPrizeBox1Count,
        children: (
          <Coin
            x={0}
            y={0}
            active={prizeBox1Prize}
            setActive={setPrizeBox1Prize}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 1200,
        y: 304,
        status: prizeBox2Status,
        setStatus: setPrizeBox2Status,
        active: prizeBox2Active,
        setActive: setPrizeBox2Active,
        prizeActive: prizeBox2Prize,
        setPrizeActive: setPrizeBox2Prize,
        prizeCount: prizeBox2Count,
        setPrizeCount: setPrizeBox2Count,
        children: (
          <Coin
            x={0}
            y={0}
            active={prizeBox2Prize}
            setActive={setPrizeBox2Prize}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 1360,
        y: 544,
        status: prizeBox3Status,
        setStatus: setPrizeBox3Status,
        active: prizeBox3Active,
        setActive: setPrizeBox3Active,
        prizeActive: prizeBox3Prize,
        setPrizeActive: setPrizeBox3Prize,
        prizeCount: prizeBox3Count,
        setPrizeCount: setPrizeBox3Count,
        children: (
          <Coin
            x={0}
            y={0}
            active={prizeBox3Prize}
            setActive={setPrizeBox3Prize}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 1440,
        y: 544,
        status: prizeBox4Status,
        setStatus: setPrizeBox4Status,
        active: prizeBox4Active,
        setActive: setPrizeBox4Active,
        prizeActive: prizeBox4Prize,
        setPrizeActive: setPrizeBox4Prize,
        prizeCount: prizeBox4Count,
        setPrizeCount: setPrizeBox4Count,
        children: (
          <Mushroom
            x={0}
            y={0}
            active={mushroom1Active}
            setActive={setMushroom1Active}
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
        status: prizeBox5Status,
        setStatus: setPrizeBox5Status,
        active: prizeBox5Active,
        setActive: setPrizeBox5Active,
        prizeActive: prizeBox5Prize,
        setPrizeActive: setPrizeBox5Prize,
        prizeCount: prizeBox5Count,
        setPrizeCount: setPrizeBox5Count,
        children: (
          <Coin
            x={0}
            y={0}
            active={prizeBox5Prize}
            setActive={setPrizeBox5Prize}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 3520,
        y: 128,
        status: prizeBox6Status,
        setStatus: setPrizeBox6Status,
        active: prizeBox6Active,
        setActive: setPrizeBox6Active,
        prizeActive: prizeBox6Prize,
        setPrizeActive: setPrizeBox6Prize,
        prizeCount: prizeBox6Count,
        setPrizeCount: setPrizeBox6Count,
        children: (
          <Leaf
            x={0}
            y={0}
            active={leaf1Active}
            setActive={setLeaf1Active}
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
        status: prizeBox7Status,
        setStatus: setPrizeBox7Status,
        active: prizeBox7Active,
        setActive: setPrizeBox7Active,
        prizeActive: prizeBox7Prize,
        setPrizeActive: setPrizeBox7Prize,
        prizeCount: prizeBox7Count,
        setPrizeCount: setPrizeBox7Count,
        children: (
          <Coin
            x={0}
            y={0}
            active={prizeBox7Prize}
            setActive={setPrizeBox7Prize}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 7520,
        y: 224,
        status: prizeBox8Status,
        setStatus: setPrizeBox8Status,
        active: prizeBox8Active,
        setActive: setPrizeBox8Active,
        prizeActive: prizeBox8Prize,
        setPrizeActive: setPrizeBox8Prize,
        prizeCount: prizeBox8Count,
        setPrizeCount: setPrizeBox8Count,
        children: (
          <Coin
            x={0}
            y={0}
            active={prizeBox8Prize}
            setActive={setPrizeBox8Prize}
            score={score}
            setScore={setScore}
          />
        ),
      },
      {
        x: 7360,
        y: 1344,
        status: prizeBox9Status,
        setStatus: setPrizeBox9Status,
        active: prizeBox9Active,
        setActive: setPrizeBox9Active,
        prizeActive: prizeBox9Prize,
        setPrizeActive: setPrizeBox9Prize,
        prizeCount: prizeBox9Count,
        setPrizeCount: setPrizeBox9Count,
        children: (
          <OneUp
            x={0}
            y={0}
            active={oneUp1Active}
            lives={lives}
            setActive={setOneUp1Active}
            setLives={setLives}
          />
        ),
      },
    ],
    [
      prizeBox1Status,
      prizeBox1Active,
      prizeBox1Count,
      prizeBox1Prize,
      prizeBox2Status,
      prizeBox2Active,
      prizeBox2Count,
      prizeBox2Prize,
      prizeBox3Status,
      prizeBox3Active,
      prizeBox3Count,
      prizeBox3Prize,
      prizeBox4Status,
      prizeBox4Active,
      prizeBox4Count,
      prizeBox4Prize,
      prizeBox5Status,
      prizeBox5Active,
      prizeBox5Count,
      prizeBox5Prize,
      prizeBox6Status,
      prizeBox6Active,
      prizeBox6Count,
      prizeBox6Prize,
      prizeBox7Status,
      prizeBox7Active,
      prizeBox7Count,
      prizeBox7Prize,
      prizeBox8Status,
      prizeBox8Active,
      prizeBox8Count,
      prizeBox8Prize,
      prizeBox9Status,
      prizeBox9Active,
      prizeBox9Count,
      prizeBox9Prize,
      leaf1Active,
      mushroom1Active,
      oneUp1Active,
      lives,
      mario,
      score,
      setLives,
      setMario,
      setScore,
    ],
  )

  const prizeInteractions = useMemo(
    () => [
      {
        xRange: [1690, 1790],
        yRange: [440, 540],
        boxStatus: prizeBox4Prize,
        prizeStatus: mushroom1Active,
        setPrizeStatus: setMushroom1Active,
      },
      {
        xRange: [3460, 3560],
        yRange: [444, 524],
        boxStatus: prizeBox6Prize,
        prizeStatus: leaf1Active,
        setPrizeStatus: setLeaf1Active,
      },
      {
        xRange: [5540, 5640],
        yRange: [304, 384],
        boxStatus: !coin1Active,
        prizeStatus: coin1Active,
        setPrizeStatus: setCoin1Active,
      },
      {
        xRange: [5700, 5800],
        yRange: [464, 544],
        boxStatus: !coin2Active,
        prizeStatus: coin2Active,
        setPrizeStatus: setCoin2Active,
      },
      {
        xRange: [7320, 7420],
        yRange: [1344, 1444],
        boxStatus: prizeBox9Prize,
        prizeStatus: oneUp1Active,
        setPrizeStatus: setOneUp1Active,
      },
    ],
    [
      coin1Active,
      coin2Active,
      leaf1Active,
      mushroom1Active,
      oneUp1Active,
      prizeBox4Prize,
      prizeBox6Prize,
      prizeBox9Prize,
    ],
  )

  // Prize Box interactions
  useEffect(() => {
    if (jump) {
      prizeBoxes.map((item) => {
        if (
          xPos > item.x - 55 &&
          xPos < item.x + 45 &&
          yPos >= item.y - 100 - (mario !== 1 ? marioOffset : 0) &&
          yPos < item.y
        ) {
          item.setActive(true)
          if (item.prizeCount > 0) {
            item.setPrizeActive(true)
          }
        }
      })
    }
  }, [prizeBoxes, jump, mario, marioOffset, xPos, yPos])

  // Prize interactions
  useEffect(() => {
    prizeInteractions.map((item) => {
      if (
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
      {bricks.map((item, x) => (
        <Brick key={x} x={item.x} y={item.y} />
      ))}

      {coins.map((item, x) => (
        <Coin
          key={x}
          x={item.x}
          y={item.y}
          show={true}
          clickable={true}
          active={item.active}
          setActive={item.setActive}
          score={score}
          setScore={setScore}
        />
      ))}

      {goombas.map((item, x) => (
        <Goomba key={x} x={item.x} y={item.y} offset={item.offset} />
      ))}

      {pipes.map((item, x) => (
        <Pipe
          key={x}
          xPos={xPos}
          x={item.x}
          y={item.y}
          height={item.height}
          {...(item.plant && { plant: item.plant })}
          {...(item.plantVariant && { plantVariant: item.plantVariant })}
          {...(item.active && { active: item.active })}
        />
      ))}

      {prizeBoxes.map((item, x) => (
        <PrizeBox
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
          setPrizeCount={item.setPrizeCount}>
          {item.children}
        </PrizeBox>
      ))}

      {turtles.map((item, x) => (
        <Turtle key={x} x={item.x} y={item.y} offset={item.offset} />
      ))}
    </>
  )
}

export default Foreground
