'use client'

import type { FC } from 'react'

import Clouds from './clouds'
import Daylight from './daylight'
import Sky from './sky'
import Sun from './sun'

export type EnvironmentProps = {
  mobile: boolean | undefined
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
