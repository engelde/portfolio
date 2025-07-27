'use client'

import Clouds from './clouds'
import Daylight from './daylight'
import Sky from './sky'
import Sun from './sun'

export type EnvironmentProps = {
  mobile: boolean | undefined
}

const Environment = ({ mobile }: EnvironmentProps) => {
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
