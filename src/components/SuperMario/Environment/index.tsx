import { FC } from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import Clouds from './Clouds'
import Daylight from './Daylight'
import Sky from './Sky'
import Sun from './Sun'

const Environment: FC = () => {
  const [mobile] = useMediaQuery('(max-width: 48rem)')

  return (
    <>
      <Sky />
      {!mobile && <Daylight />}
      <Sun />
      {!mobile && <Clouds />}
    </>
  )
}

export default Environment
