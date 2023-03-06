import { FC } from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import Clouds from './Clouds'
import Daylight from './Daylight'
import Sky from './Sky'
import Sun from './Sun'

type Props = {
  mobile: boolean
}

const Environment: FC<Props> = ({ mobile }: Props) => {
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
