import { FC, ReactNode, useEffect, useState } from 'react'
import { Box as CkBox } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
  status: boolean
  setStatus: (status: boolean) => void
  active: boolean
  setActive: (active: boolean) => void
  prizeActive: boolean
  setPrizeActive: (active: boolean) => void
  prizeCount: number
  setPrizeCount: (count: number) => void
  children: ReactNode
}

const Box: FC<Props> = ({
  x,
  y,
  status,
  setStatus,
  active,
  setActive,
  prizeActive,
  setPrizeActive,
  prizeCount,
  setPrizeCount,
  children,
}: Props) => {
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (active && !running) {
      setRunning(true)
      setPrizeCount(prizeCount - 1)

      setTimeout(() => {
        setActive(false)
        setRunning(false)
      }, 200)
    }

    if (status && prizeCount < 1) {
      setStatus(false)
    }
  }, [active, prizeCount, setActive, setPrizeCount, setStatus, running, status])

  const handleAction = () => {
    if (status) {
      setActive(true)
      setPrizeActive(true)
    }
  }

  return (
    <CkBox
      zIndex={10}
      p={0}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      className={'animate__animated animate__slow animate__slideInUp'}>
      <CkBox
        position={'absolute'}
        left={0}
        bottom={'-80px'}
        className={styles.prize + ' ' + (prizeActive && styles.enter)}>
        {prizeActive && [children]}
      </CkBox>
      <CkBox
        width={'80px'}
        className={
          styles.box +
          ' ' +
          ((status && styles.active) || styles.inactive) +
          ' ' +
          (active && styles.bump)
        }
        onClick={handleAction}
      />
    </CkBox>
  )
}

export default Box
