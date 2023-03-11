import { FC } from 'react'
import Clouds from './Clouds'
import Daylight from './Daylight'
import Sky from './Sky'
import Sun from './Sun'

export type EnvironmentProps = {
  mobile: boolean
}

const Environment: FC<EnvironmentProps> = ({ mobile }: EnvironmentProps) => {
  return (
    <>
      <Sky />
      {!mobile && <Daylight />}
      {!mobile && <Sun />}
      {!mobile && <Clouds />}
    </>
  )
}

export default Environment
