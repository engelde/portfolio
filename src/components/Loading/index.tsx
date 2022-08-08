import { FC } from 'react'
import { Progress, ProgressProps } from '@chakra-ui/react'

const colors: string[] = ['red', 'yellow', 'blue', 'green', 'orange', 'purple', 'pink', 'cyan']

type Props = ProgressProps & {
  progress: number
}

const Loading: FC<Props> = ({ progress, ...rest }: Props) => {
  return (
    <Progress
      value={progress}
      size="xs"
      bg={'none'}
      colorScheme={colors[Math.floor(Math.random() * colors.length)]}
      isIndeterminate
      {...rest}
    />
  )
}

export default Loading
