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
        mb={prizeActive ? '80px' : 0}
        transitionDelay={prizeActive ? '0.2s' : '0s'}
        transition={prizeActive ? 'all 0.4s ease-in-out' : 'margin-bottom 2s ease-in-out'}>
        {prizeActive && [children]}
      </CkBox>
      <CkBox
        height={'80px'}
        width={'80px'}
        mb={active ? '20px' : 0}
        background={
          (status ? 'url("/images/box/box.1.png")' : 'url("/images/box/box.0.png")') +
          ' no-repeat center center / cover'
        }
        cursor={status ? 'pointer' : 'default'}
        transition={active ? 'margin-bottom 0.16s ease-in-out' : 'none'}
        _hover={{ filter: status ? 'brightness(115%)' : 'brightness(100%)' }}
        className={status ? styles.active : ''}
        onClick={handleAction}
      />
    </CkBox>
  )
}

export default Box
