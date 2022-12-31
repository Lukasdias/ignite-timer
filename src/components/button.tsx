import { Play, HandPalm } from 'phosphor-react'
import { motion } from 'framer-motion'

interface Props {
  variant: 'start' | 'stop'
  disabled?: boolean
  onClick?: () => void
}

const Icon = ({ variant }: { variant: 'start' | 'stop' }) => {
  if (variant === 'start') {
    return <Play size={24} weight="bold" className={'text-grayscale-white'} />
  }
  return <HandPalm size={24} weight="bold" className={'text-grayscale-white'} />
}

const Label = ({ variant }: { variant: 'start' | 'stop' }) => {
  return (
    <span className={'font-bold text-grayscale-title'}>
      {variant === 'start' ? 'Começar' : 'Interromper'}
    </span>
  )
}

export default function Button({
  variant,
  disabled,
  onClick
}: Props): React.ReactElement {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      type={'submit'}
      className={`flex w-full items-center justify-center gap-2 rounded-default p-4 transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
        variant === 'start'
          ? 'bg-brand-principal hover:bg-brand-light'
          : 'bg-error-assets hover:bg-error-text'
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon variant={variant} />
      <Label variant={variant} />
    </motion.button>
  )
}
