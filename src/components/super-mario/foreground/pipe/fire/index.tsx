'use client'

import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

export type FireProps = {
  x: number
  y: number
  flightX: number
  flightY: number
  angle: number
  shotKey: number
  onComplete: () => void
}

const fireAnimation = keyframes`
  0% { background-position: 0 0; }
  25% { background-position: -30px 0; }
  50% { background-position: -60px 0; }
  75% { background-position: -90px 0; }
  100% { background-position: 0 0; }
`

const fireFlight = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }
  6% {
    opacity: 1;
    transform: translate(0, 0);
  }
  94% {
    opacity: 1;
    transform: translate(var(--fire-x), var(--fire-y));
  }
  100% {
    opacity: 0;
    transform: translate(var(--fire-x), var(--fire-y));
  }
`

const Fire = ({ x, y, flightX, flightY, angle, shotKey, onComplete }: FireProps) => {
  return (
    <Box
      key={shotKey}
      zIndex={-2}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      aria-label={'fire'}
      role={'img'}
      w={30}
      h={34}
      sx={{
        '--fire-x': `${flightX}px`,
        '--fire-y': `${flightY}px`,
        animation: `${fireFlight} 1.8s linear forwards`,
        transformOrigin: 'center center',
      }}
      onAnimationEnd={(event) => {
        if (event.currentTarget !== event.target) return
        onComplete()
      }}
    >
      <Box
        w={30}
        h={34}
        bgImage={'url("/images/fire/fire.sprite.png")'}
        bgPosition={'0 0'}
        bgRepeat={'no-repeat'}
        bgSize={'120px 34px'}
        transform={`rotate(${angle}deg)`}
        transformOrigin={'center center'}
        sx={{
          animation: `${fireAnimation} 0.5s steps(1) infinite`,
          imageRendering: 'pixelated',
        }}
      />
    </Box>
  )
}

export default Fire
