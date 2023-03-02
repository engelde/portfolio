import { FC, useState, useEffect } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import Points from '../Points'
import styles from './styles.module.css'

type Props = {
  active: boolean
  setActive: (status: boolean) => void
  x: number
  y: number
  score: number
  setScore: (score: number) => void
}

const Mushroom: FC<Props> = ({ active, setActive, x, y, score, setScore }: Props) => {
  const [running, setRunning] = useState(false)
  const value = 1000

  useEffect(() => {
    if (active && !running) {
      setScore(score + value)
      setRunning(true)
    }
  }, [active, score, setActive, setScore, running, setRunning])

  return (
    <>
      {active && <Points x={x + 320} y={y - 40} total={value} />}
      <Box
        zIndex={-99}
        position={'absolute'}
        height={'80px'}
        width={'80px'}
        left={x + 'px'}
        bottom={y + 80 + 'px'}
        p={0}
        ml={'320px'}
        mb={'-160px'}
        cursor={'pointer'}
        display={active ? 'none' : 'inherit'}
        _hover={{ cursor: 'pointer', filter: 'brightness(115%) !important' }}
        className={styles.mushroom}
        onClick={() => setActive(true)}>
        <NextImage
          alt={'Mushroom'}
          src={'/images/mushroom/mushroom.png'}
          height={80}
          width={80}
          quality={80}
          priority
        />
      </Box>
    </>
  )
}

export default Mushroom
