import { FC, useEffect, useState } from 'react'
import { Box as CkBox } from '@chakra-ui/react'
import Box from './Box'
import Brick from './Brick'
import Coin from './Coin'
import Cube from './Cube'
import Goomba from './Goomba'
import Mushroom from './Mushroom'
import Pipe from './Pipe'
import Rock from './Rock'
import ScrollIndicator from './ScrollIndicator'
import Turtle from './Turtle'

type Props = {
  xPos: number
  yPos: number
  jump: boolean
  mobile: boolean
  score: number
  setJumpOffset: (offset: number) => void
  setScore: (score: number) => void
}

const Foreground: FC<Props> = ({
  xPos,
  yPos,
  jump,
  mobile,
  score,
  setJumpOffset,
  setScore,
}: Props) => {
  const [box1Status, setBox1Status] = useState(true)
  const [box1Active, setBox1Active] = useState(false)
  const [box1PrizeActive, setBox1PrizeActive] = useState(false)
  const [box1PrizeCount, setBox1PrizeCount] = useState(mobile ? 0 : 1)

  const [box2Status, setBox2Status] = useState(true)
  const [box2Active, setBox2Active] = useState(false)
  const [box2PrizeActive, setBox2PrizeActive] = useState(false)
  const [box2PrizeCount, setBox2PrizeCount] = useState(mobile ? 0 : 1)

  const [box3Status, setBox3Status] = useState(true)
  const [box3Active, setBox3Active] = useState(false)
  const [box3PrizeActive, setBox3PrizeActive] = useState(false)
  const [box3PrizeCount, setBox3PrizeCount] = useState(mobile ? 0 : 1)

  const [box4Status, setBox4Status] = useState(true)
  const [box4Active, setBox4Active] = useState(false)
  const [box4PrizeActive, setBox4PrizeActive] = useState(false)
  const [box4PrizeCount, setBox4PrizeCount] = useState(mobile ? 0 : 1)
  const [prize4Active, setPrize4Active] = useState(false)

  const [box5Status, setBox5Status] = useState(true)
  const [box5Active, setBox5Active] = useState(false)
  const [box5PrizeActive, setBox5PrizeActive] = useState(false)
  const [box5PrizeCount, setBox5PrizeCount] = useState(mobile ? 0 : 1)

  const [box6Status, setBox6Status] = useState(true)
  const [box6Active, setBox6Active] = useState(false)
  const [box6PrizeActive, setBox6PrizeActive] = useState(false)
  const [box6PrizeCount, setBox6PrizeCount] = useState(0)

  const [box7Status, setBox7Status] = useState(true)
  const [box7Active, setBox7Active] = useState(false)
  const [box7PrizeActive, setBox7PrizeActive] = useState(false)
  const [box7PrizeCount, setBox7PrizeCount] = useState(mobile ? 0 : 1)

  const [box8Status, setBox8Status] = useState(true)
  const [box8Active, setBox8Active] = useState(false)
  const [box8PrizeActive, setBox8PrizeActive] = useState(false)
  const [box8PrizeCount, setBox8PrizeCount] = useState(mobile ? 0 : 1)

  useEffect(() => {
    if (jump) {
      // box 1
      if (xPos < 1160 && xPos > 1060 && yPos < 304) {
        if (yPos < 304) {
          setJumpOffset(160)
        }
        if (yPos > 204 && yPos < 244) {
          setBox1Active(true)
          if (box1PrizeCount > 0) {
            setBox1PrizeActive(true)
          }
        }
      }
      // box 2
      else if (xPos < 1240 && xPos > 1140 && yPos < 304) {
        if (yPos < 304) {
          setJumpOffset(160)
        }
        if (yPos > 204 && yPos < 244) {
          setBox2Active(true)
          if (box2PrizeCount > 0) {
            setBox2PrizeActive(true)
          }
        }
      }
      // box 3
      else if (xPos < 1400 && xPos > 1300 && yPos > 384) {
        if (yPos > 384) {
          setJumpOffset(160)
        }
        if (yPos > 444 && yPos < 484) {
          setBox3Active(true)
          if (box3PrizeCount > 0) {
            setBox3PrizeActive(true)
          }
        }
      }
      // box 4
      else if (xPos < 1480 && xPos > 1380 && yPos > 384) {
        if (yPos > 384) {
          setJumpOffset(160)
        }
        if (yPos > 444 && yPos < 484) {
          setBox4Active(true)
          if (box4PrizeCount > 0) {
            setBox4PrizeActive(true)
          }
        }
      }
      // box 5
      else if (xPos < 2360 && xPos > 2260 && yPos > 384) {
        if (yPos > 384) {
          setJumpOffset(160)
        }
        if (yPos > 440 && yPos < 480) {
          setBox5Active(true)
          if (box5PrizeCount > 0) {
            setBox5PrizeActive(true)
          }
        }
      }
      // box 7
      else if (xPos < 3800 && xPos > 3720 && yPos < 288) {
        if (yPos < 288) {
          setJumpOffset(60)
        }
        if (yPos > 168 && yPos < 208) {
          setBox7Active(true)
          if (box7PrizeCount > 0) {
            setBox7PrizeActive(true)
          }
        }
      }
      // box 8
      else if (xPos < 7600 && xPos > 7500 && yPos < 244) {
        if (yPos < 244) {
          setJumpOffset(60)
        }
        if (yPos > 104 && yPos < 144) {
          setBox8Active(true)
          if (box8PrizeCount > 0) {
            setBox8PrizeActive(true)
          }
        }
      }
    }

    // prize 4
    if (xPos > 1700 && xPos < 1800 && yPos > 440 && yPos < 540) {
      if (!prize4Active) {
        setPrize4Active(true)
      }
    }
  }, [
    xPos,
    yPos,
    jump,
    box1PrizeCount,
    box2PrizeCount,
    box3PrizeCount,
    box4PrizeCount,
    box5PrizeCount,
    box7PrizeCount,
    box8PrizeCount,
    prize4Active,
    setBox1Active,
    setBox1PrizeActive,
    setBox2Active,
    setBox2PrizeActive,
    setBox3Active,
    setBox3PrizeActive,
    setBox4Active,
    setBox4PrizeActive,
    setBox5Active,
    setBox5PrizeActive,
    setBox7Active,
    setBox7PrizeActive,
    setBox8Active,
    setBox8PrizeActive,
    setJumpOffset,
    setPrize4Active,
  ])

  return (
    <CkBox zIndex={99} position={'absolute'} left={0} bottom={0} width={'full'} height={'full'}>
      <Box
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
          active={box1PrizeActive}
          setActive={setBox1PrizeActive}
          x={0}
          y={0}
          score={score}
          setScore={setScore}
        />
      </Box>
      <Box
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
          active={box2PrizeActive}
          setActive={setBox2PrizeActive}
          x={0}
          y={0}
          score={score}
          setScore={setScore}
        />
      </Box>

      <Box
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
          active={box3PrizeActive}
          setActive={setBox3PrizeActive}
          x={0}
          y={0}
          score={score}
          setScore={setScore}
        />
      </Box>
      <Box
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
          active={prize4Active}
          setActive={setPrize4Active}
          x={0}
          y={0}
          score={score}
          setScore={setScore}
        />
      </Box>

      <Box
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
          active={box5PrizeActive}
          setActive={setBox5PrizeActive}
          x={0}
          y={0}
          score={score}
          setScore={setScore}
        />
      </Box>

      <Cube variant={1} x={1440} y={64} />

      <Goomba x={1520} y={64} offset={800} />

      <Pipe
        x={2000}
        y={64}
        height={240}
        plant={true}
        plantVariant={2}
        forwards={xPos < 2080}
        active={xPos > 300 && xPos < 2800}
      />

      <Cube variant={2} x={2240} y={64} />

      <Goomba x={3280} y={64} offset={1120} />

      <Turtle x={3200} y={224} />

      <Box
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
          active={box6PrizeActive}
          setActive={setBox6PrizeActive}
          x={0}
          y={0}
          score={score}
          setScore={setScore}
        />
      </Box>
      <Box
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
          active={box7PrizeActive}
          setActive={setBox7PrizeActive}
          x={0}
          y={0}
          score={score}
          setScore={setScore}
        />
      </Box>

      <Goomba x={4780} y={128} offset={1200} />
      <Goomba x={5580} y={128} offset={2000} />

      <Cube x={6480} y={64} variant={3} />

      <Box
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
          active={box8PrizeActive}
          setActive={setBox8PrizeActive}
          x={0}
          y={0}
          score={score}
          setScore={setScore}
        />
      </Box>

      <Rock x={7680} y={384} />
      <Rock x={7760} y={384} />

      <Rock x={8000} y={64} />
      <Rock x={8080} y={64} />
      <Rock x={8080} y={144} />
      <Rock x={8160} y={64} />
      <Rock x={8160} y={144} />
      <Rock x={8160} y={224} />
      <Rock x={8480} y={64} />
      <Rock x={8480} y={144} />
      <Rock x={8480} y={224} />
      <Rock x={8560} y={64} />
      <Rock x={8560} y={144} />
      <Rock x={8640} y={64} />

      <Pipe x={9200} y={64} height={160} plant={true} />
      <Pipe x={9520} y={64} height={240} plant={true} plantVariant={2} forwards={xPos < 9640} />

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

      <Cube variant={4} x={10960} y={64} />

      <Pipe x={11560} y={64} height={240} />
      <Pipe x={11560} y={624} height={1120} />

      <Rock x={11560} y={224} />
      <Rock x={11640} y={224} />

      <Rock x={11560} y={544} />
      <Rock x={11640} y={544} />

      <Pipe x={11880} y={64} height={160} />

      <Pipe x={13080} y={64} height={400} rotate={-90} />

      <ScrollIndicator />
    </CkBox>
  )
}

export default Foreground
