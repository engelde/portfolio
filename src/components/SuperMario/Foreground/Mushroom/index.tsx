import { FC, useState, useEffect } from 'react'
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
        width={'80px'}
        height={'80px'}
        left={x + 'px'}
        bottom={y + 80 + 'px'}
        p={0}
        className={styles.mushroom + ' ' + (active && styles.active)}
        _hover={{ cursor: 'pointer', filter: 'brightness(115%)' }}
        onClick={() => setActive(true)}
      />
    </>
  )
}

export default Mushroom
