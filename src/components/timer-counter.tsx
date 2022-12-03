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
      {variant === 'time' ? '0' : ':'}
    </span>
  )
}

export default function TimerCounter() {
  return (
    <div
      className={
        'relative flex w-full justify-center gap-4 text-grayscale-title '
      }
    >
      <TimerElement variant="time" value="0" />
      <TimerElement variant="time" value="0" />
      <TimerElement variant="separator" value=":" />
      <TimerElement variant="time" value="0" />
      <TimerElement variant="time" value="0" />
    </div>
  )
}
