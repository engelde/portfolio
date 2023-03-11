import { FC, useEffect, useMemo, useState } from 'react'
import Brick from './Brick'
import Coin from './Coin'
import Goomba from './Goomba'
import Mushroom from './Mushroom'
import Pipe from './Pipe'
import PrizeBox from './PrizeBox'
import Turtle from './Turtle'

type Props = {
  xPos: number
  yPos: number
  jump: boolean
  marioVariant: 1 | 2
  score: number
  setJumpOffset: (offset: number) => void
  setMarioVariant: (variant: 1 | 2) => void
  setScore: (score: number) => void
}

const Foreground: FC<Props> = ({
  xPos,
  yPos,
  jump,
  marioVariant,
  score,
  setJumpOffset,
  setMarioVariant,
  setScore,
}: Props) => {
  const [box1Status, setBox1Status] = useState(true)
  const [box1Active, setBox1Active] = useState(false)
  const [box1PrizeActive, setBox1PrizeActive] = useState(false)
  const [box1PrizeCount, setBox1PrizeCount] = useState(1)

  const [box2Status, setBox2Status] = useState(true)
  const [box2Active, setBox2Active] = useState(false)
  const [box2PrizeActive, setBox2PrizeActive] = useState(false)
  const [box2PrizeCount, setBox2PrizeCount] = useState(1)

  const [box3Status, setBox3Status] = useState(true)
  const [box3Active, setBox3Active] = useState(false)
  const [box3PrizeActive, setBox3PrizeActive] = useState(false)
  const [box3PrizeCount, setBox3PrizeCount] = useState(1)

  const [box4Status, setBox4Status] = useState(true)
  const [box4Active, setBox4Active] = useState(false)
  const [box4PrizeActive, setBox4PrizeActive] = useState(false)
  const [box4PrizeCount, setBox4PrizeCount] = useState(1)

  const [box5Status, setBox5Status] = useState(true)
  const [box5Active, setBox5Active] = useState(false)
  const [box5PrizeActive, setBox5PrizeActive] = useState(false)
  const [box5PrizeCount, setBox5PrizeCount] = useState(1)

  const [box6Status, setBox6Status] = useState(true)
  const [box6Active, setBox6Active] = useState(false)
  const [box6PrizeActive, setBox6PrizeActive] = useState(false)
  const [box6PrizeCount, setBox6PrizeCount] = useState(0)

  const [box7Status, setBox7Status] = useState(true)
  const [box7Active, setBox7Active] = useState(false)
  const [box7PrizeActive, setBox7PrizeActive] = useState(false)
  const [box7PrizeCount, setBox7PrizeCount] = useState(1)

  const [box8Status, setBox8Status] = useState(true)
  const [box8Active, setBox8Active] = useState(false)
  const [box8PrizeActive, setBox8PrizeActive] = useState(false)
  const [box8PrizeCount, setBox8PrizeCount] = useState(1)

  const [coin1Active, setCoin1Active] = useState(false)
  const [coin2Active, setCoin2Active] = useState(false)
  const [coin3Active, setCoin3Active] = useState(false)
  const [coin4Active, setCoin4Active] = useState(false)
  const [coin5Active, setCoin5Active] = useState(false)

  const [mushroom1Active, setMushroom1Active] = useState(false)

  const prizeBoxes = useMemo(
    () => [
      {
        xRange: [1070, 1150],
        yRange: [204, 304],
        jumpMax: 160,
        setBoxStatus: setBox1Active,
        prizeCount: box1PrizeCount,
        setPrizeStatus: setBox1PrizeActive,
      },
      {
        xRange: [1150, 1230],
        yRange: [204, 304],
        jumpMax: 160,
        setBoxStatus: setBox2Active,
        prizeCount: box2PrizeCount,
        setPrizeStatus: setBox2PrizeActive,
      },
      {
        xRange: [1310, 1390],
        yRange: [444, 544],
        jumpMax: 160,
        setBoxStatus: setBox3Active,
        prizeCount: box3PrizeCount,
        setPrizeStatus: setBox3PrizeActive,
      },
      {
        xRange: [1390, 1470],
        yRange: [444, 544],
        jumpMax: 160,
        setBoxStatus: setBox4Active,
        prizeCount: box4PrizeCount,
        setPrizeStatus: setBox4PrizeActive,
      },
      {
        xRange: [2270, 2350],
        yRange: [444, 544],
        jumpMax: 160,
        setBoxStatus: setBox5Active,
        prizeCount: box5PrizeCount,
        setPrizeStatus: setBox5PrizeActive,
      },
      {
        xRange: [3710, 3790],
        yRange: [204, 304],
        jumpMax: 80,
        setBoxStatus: setBox7Active,
        prizeCount: box7PrizeCount,
        setPrizeStatus: setBox7PrizeActive,
      },
      {
        xRange: [7470, 7550],
        yRange: [124, 224],
        jumpMax: 80,
        setBoxStatus: setBox8Active,
        prizeCount: box8PrizeCount,
        setPrizeStatus: setBox8PrizeActive,
      },
    ],
    [
      box1PrizeCount,
      box2PrizeCount,
      box3PrizeCount,
      box4PrizeCount,
      box5PrizeCount,
      box7PrizeCount,
      box8PrizeCount,
    ],
  )

  const prizes = useMemo(
    () => [
      {
        xRange: [1690, 1790],
        yRange: [460, 540],
        prizeStatus: mushroom1Active,
        setPrizeStatus: setMushroom1Active,
      },
    ],
    [mushroom1Active],
  )

  // Prize Box interactions
  useEffect(() => {
    if (jump) {
      prizeBoxes.map((item) => {
        if (
          xPos > item.xRange[0] &&
          xPos < item.xRange[1] &&
          yPos > item.yRange[0] &&
          yPos < item.yRange[1]
        ) {
          setJumpOffset(item.jumpMax - (marioVariant !== 1 ? 60 : 0))
          item.setBoxStatus(true)
          if (item.prizeCount > 0) {
            item.setPrizeStatus(true)
          }
        }
      })
    }
  }, [prizeBoxes, jump, marioVariant, xPos, yPos, setJumpOffset])

  // Prize interactions
  useEffect(() => {
    prizes.map((item) => {
      if (
        xPos > item.xRange[1] &&
        xPos < item.xRange[2] &&
        yPos > item.yRange[1] &&
        yPos < item.xRange[2]
      ) {
        if (!item.prizeStatus) {
          item.setPrizeStatus(true)
        }
      }
    })
  }, [prizes, xPos, yPos])

  return (
    <>
      <PrizeBox
        x={1120}
        y={304}
        status={box1Status}
        setStatus={setBox1Status}
        active={box1Active}
        setActive={setBox1Active}
        prizeActive={box1PrizeActive}
        setPrizeActive={setBox1PrizeActive}
        prizeCount={box1PrizeCount}
        setPrizeCount={setBox1PrizeCount}>
        <Coin
          x={0}
          y={0}
          active={box1PrizeActive}
          setActive={setBox1PrizeActive}
          score={score}
          setScore={setScore}
        />
      </PrizeBox>
      <PrizeBox
        x={1200}
        y={304}
        status={box2Status}
        setStatus={setBox2Status}
        active={box2Active}
        setActive={setBox2Active}
        prizeActive={box2PrizeActive}
        setPrizeActive={setBox2PrizeActive}
        prizeCount={box2PrizeCount}
        setPrizeCount={setBox2PrizeCount}>
        <Coin
          x={0}
          y={0}
          active={box2PrizeActive}
          setActive={setBox2PrizeActive}
          score={score}
          setScore={setScore}
        />
      </PrizeBox>

      <PrizeBox
        x={1360}
        y={544}
        status={box3Status}
        setStatus={setBox3Status}
        active={box3Active}
        setActive={setBox3Active}
        prizeActive={box3PrizeActive}
        setPrizeActive={setBox3PrizeActive}
        prizeCount={box3PrizeCount}
        setPrizeCount={setBox3PrizeCount}>
        <Coin
          x={0}
          y={0}
          active={box3PrizeActive}
          setActive={setBox3PrizeActive}
          score={score}
          setScore={setScore}
        />
      </PrizeBox>
      <PrizeBox
        x={1440}
        y={544}
        status={box4Status}
        setStatus={setBox4Status}
        active={box4Active}
        setActive={setBox4Active}
        prizeActive={box4PrizeActive}
        setPrizeActive={setBox4PrizeActive}
        prizeCount={box4PrizeCount}
        setPrizeCount={setBox4PrizeCount}>
        <Mushroom
          x={0}
          y={0}
          active={mushroom1Active}
          setActive={setMushroom1Active}
          marioVariant={marioVariant}
          setMarioVariant={setMarioVariant}
          score={score}
          setScore={setScore}
        />
      </PrizeBox>

      <PrizeBox
        x={2320}
        y={540}
        status={box5Status}
        setStatus={setBox5Status}
        active={box5Active}
        setActive={setBox5Active}
        prizeActive={box5PrizeActive}
        setPrizeActive={setBox5PrizeActive}
        prizeCount={box5PrizeCount}
        setPrizeCount={setBox5PrizeCount}>
        <Coin
          x={0}
          y={0}
          active={box5PrizeActive}
          setActive={setBox5PrizeActive}
          score={score}
          setScore={setScore}
        />
      </PrizeBox>

      <Goomba x={1920} y={64} offset={1200} />

      <Pipe
        x={2000}
        y={64}
        height={240}
        plant={true}
        plantVariant={2}
        forwards={xPos < 2080}
        active={xPos > 300 && xPos < 2800}
      />

      <Goomba x={3280} y={64} offset={1120} />

      <Turtle x={3200} y={224} offset={400} />

      <PrizeBox
        x={3520}
        y={128}
        status={box6Status}
        setStatus={setBox6Status}
        active={box6Active}
        setActive={setBox6Active}
        prizeActive={box6PrizeActive}
        setPrizeActive={setBox6PrizeActive}
        prizeCount={box6PrizeCount}
        setPrizeCount={setBox6PrizeCount}>
        <Coin
          x={0}
          y={0}
          active={box6PrizeActive}
          setActive={setBox6PrizeActive}
          score={score}
          setScore={setScore}
        />
      </PrizeBox>
      <PrizeBox
        x={3760}
        y={288}
        status={box7Status}
        setStatus={setBox7Status}
        active={box7Active}
        setActive={setBox7Active}
        prizeActive={box7PrizeActive}
        setPrizeActive={setBox7PrizeActive}
        prizeCount={box7PrizeCount}
        setPrizeCount={setBox7PrizeCount}>
        <Coin
          x={0}
          y={0}
          active={box7PrizeActive}
          setActive={setBox7PrizeActive}
          score={score}
          setScore={setScore}
        />
      </PrizeBox>

      <Goomba x={4800} y={128} offset={1200} />
      <Goomba x={5600} y={128} offset={2000} />

      <Coin
        x={5600}
        y={308}
        show={true}
        clickable={true}
        active={coin1Active}
        setActive={setCoin1Active}
        score={score}
        setScore={setScore}
      />
      <Coin
        x={5760}
        y={468}
        show={true}
        clickable={true}
        active={coin2Active}
        setActive={setCoin2Active}
        score={score}
        setScore={setScore}
      />
      <Coin
        x={5920}
        y={628}
        show={true}
        clickable={true}
        active={coin3Active}
        setActive={setCoin3Active}
        score={score}
        setScore={setScore}
      />
      <Coin
        x={6080}
        y={788}
        show={true}
        clickable={true}
        active={coin4Active}
        setActive={setCoin4Active}
        score={score}
        setScore={setScore}
      />
      <Coin
        x={6240}
        y={948}
        show={true}
        clickable={true}
        active={coin5Active}
        setActive={setCoin5Active}
        score={score}
        setScore={setScore}
      />

      <PrizeBox
        x={7520}
        y={224}
        status={box8Status}
        setStatus={setBox8Status}
        active={box8Active}
        setActive={setBox8Active}
        prizeActive={box8PrizeActive}
        setPrizeActive={setBox8PrizeActive}
        prizeCount={box8PrizeCount}
        setPrizeCount={setBox8PrizeCount}>
        <Coin
          x={0}
          y={0}
          active={box8PrizeActive}
          setActive={setBox8PrizeActive}
          score={score}
          setScore={setScore}
        />
      </PrizeBox>

      <Pipe x={9200} y={64} height={160} plant={true} />
      <Pipe x={9520} y={64} height={240} plant={true} plantVariant={2} forwards={xPos < 9600} />

      <Brick x={10000} y={64} />
      <Brick x={10080} y={64} />
      <Brick x={10080} y={144} />
      <Brick x={10160} y={64} />
      <Brick x={10160} y={144} />
      <Brick x={10160} y={224} />
      <Brick x={10240} y={64} />
      <Brick x={10240} y={144} />
      <Brick x={10240} y={224} />
      <Brick x={10320} y={64} />
      <Brick x={10320} y={144} />
      <Brick x={10320} y={224} />
      <Brick x={10400} y={64} />
      <Brick x={10400} y={144} />
      <Brick x={10400} y={224} />
      <Brick x={10480} y={64} />
      <Brick x={10720} y={64} />
      <Brick x={10720} y={144} />
      <Brick x={10800} y={64} />

      <Pipe x={11560} y={64} height={240} />
      <Pipe x={11560} y={624} height={1120} />
      <Pipe x={11560} y={544} height={80} />

      <Pipe x={11880} y={64} height={160} />
    </>
  )
}

export default Foreground
