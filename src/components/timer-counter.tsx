/* eslint-disable react/display-name */
import { memo } from 'react'

const TimerElement = ({
  variant,
  value
}: {
  variant: 'time' | 'separator'
  value: string
}) => {
  const timeStyles =
    'px-4 flex flex-1 justify-center rounded-default bg-gray-200 text-gray-800 text-[160px] font-bold font-mono text-grayscale-title bg-grayscale-divider'
  const separatorStyles =
    'bg-gray-200 text-gray-800 text-[160px] font-bold font-mono text-brand-principal w-[4rem] justify-center flex'
  return (
    <span className={variant === 'time' ? timeStyles : separatorStyles}>
      {variant === 'time' ? value : ':'}
    </span>
  )
}

export const TimerCounter = memo(
  ({ minutes, seconds }: { minutes: string; seconds: string }) => {
    return (
      <div
        className={
          'relative flex w-full justify-center gap-4 text-grayscale-title '
        }
      >
        <TimerElement variant="time" value={minutes[0]} />
        <TimerElement variant="time" value={minutes[1]} />
        <TimerElement variant="separator" value=":" />
        <TimerElement variant="time" value={seconds[0]} />
        <TimerElement variant="time" value={seconds[1]} />
      </div>
    )
  }
)
