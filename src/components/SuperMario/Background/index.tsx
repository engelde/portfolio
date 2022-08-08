import { FC } from 'react'
import Daylight from './Daylight'
import Sky from './Sky'

const Background: FC = () => {
  return (
    <>
      <Sky />
      <Daylight />
    </>
  )
}

export default Background
