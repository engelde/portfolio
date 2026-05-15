'use client'

import Clouds from './clouds'
import Daylight from './daylight'
import Overlay from './overlay'
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
      <Overlay />
    </>
  )
}

export default Environment
