import { FC, useEffect, useState } from 'react'
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

const Coin: FC<Props> = ({ active, setActive, x, y, score, setScore }: Props) => {
  const [unloaded, setUnloaded] = useState(false)
  const value = 100

  useEffect(() => {
    if (active && !unloaded) {
      setScore(score + value)
      setUnloaded(true)
    }
  }, [active, score, setUnloaded, setScore, unloaded])

  return (
    <>
      {active && <Points x={x} y={y + 260} total={value} />}
      <Box
        zIndex={-99}
        position={'absolute'}
        width={'80px'}
        height={'80px'}
        mb={0}
        p={0}
        left={x + 'px'}
        bottom={y + 80 + 'px'}
        background={
          'url("/_next/image?url=%2Fimages%2Fcoin%2Fcoin.1.png&w=256&q=80") no-repeat center center / cover'
        }
        opacity={active ? 0 : 1}
        className={styles.coin + ' ' + (active && styles.active)}
        _hover={{ cursor: 'pointer', filter: 'brightness(125%)' }}
        onClick={() => setActive(true)}
      />
    </>
  )
}

export default Coin
