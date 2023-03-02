import { FC } from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import Clouds from './Clouds'
import Moon from './Moon'
import Sun from './Sun'

const Environment: FC = () => {
  const [mobile] = useMediaQuery('(max-width: 48rem)')

  return (
    <>
      <Sun />
      {/* <Moon /> */}
      {!mobile && <Clouds />}
    </>
  )
}

export default Environment
