import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'

interface TooltipProps {
  text: string
  trigger: React.ReactNode
}

const AnimatedTooltipContent = motion(TooltipPrimitive.Content)

export default function Tooltip({ text, trigger }: TooltipProps) {
  return (
    <AnimatePresence>
      <TooltipPrimitive.Provider delayDuration={200}>
        <TooltipPrimitive.Root delayDuration={200}>
          <TooltipPrimitive.Trigger className="flex items-center justify-center">
            {trigger}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <AnimatedTooltipContent
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.2
              }}
              className={'rounded-lg bg-grayscale-background py-2 px-4'}
            >
              <TooltipPrimitive.Arrow
                className={'mb-1 fill-grayscale-background '}
              />
              <p className={'text-sm font-bold text-grayscale-text'}>{text}</p>
            </AnimatedTooltipContent>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </AnimatePresence>
  )
}
