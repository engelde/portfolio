'use client'

import NextImage from 'next/image'

import { MotionBox } from '@/components/motion'

export type CloudProps = {
  x: number
  y: number
}

const Cloud = ({ x, y }: CloudProps) => {
  return (
    <MotionBox
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={'80px'}
      h={'80px'}
      initial={{ translateY: '150%' }}
      animate={{ translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}
    >
      <NextImage
        alt={'cloud'}
        src={'/images/cloud/cloud.3.png'}
        width={80}
        height={80}
        draggable={false}
        unoptimized
      />
    </MotionBox>
  )
}

export default Cloud
