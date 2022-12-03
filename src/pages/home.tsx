import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import { PomodoroTask } from '../services/usePomodoro'
import Button from './../components/button'
import TimerCounter from './../components/timer-counter'

interface Props {
  timer: React.ReactNode
}
export default function Home() {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
  }, [])

  const [newPomodoro, setNewPomodoro] = useState<PomodoroTask | null>(null)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex grow flex-col items-center justify-center px-60"
      >
        <form
          className="flex h-full w-full flex-col items-center gap-9"
          onSubmit={handleSubmit}
        >
          <section
            className={
              'flex w-full items-center justify-center gap-2 text-grayscale-title'
            }
          >
            <label htmlFor={'task'} className={'text-lg font-bold'}>
              Vou trabalhar em
            </label>
            <input
              id={'task'}
              placeholder={'Dê um nome para o seu projeto'}
              list={'task-suggestions'}
              className={
                'relative h-[2.5rem] grow items-center border-x-0 border-b-2  border-t-0 border-b-grayscale-placeholder bg-transparent  text-lg  font-bold text-grayscale-white transition duration-200 placeholder:overflow-visible placeholder:font-normal focus:border-brand-principal focus:outline-none'
              }
            />
            <datalist id={'task-suggestions'}>
              <option value={'Projeto 1'} />
              <option value={'Projeto 2'} />
              <option value={'Projeto 3'} />
              <option value={'Projeto 4'} />
            </datalist>
            <label htmlFor={'task'} className={'text-lg font-bold'}>
              durante
            </label>
            <input
              type="number"
              id={'minutesAmount'}
              className="h-[2.5rem] w-[4rem] items-center border-x-0 border-b-2 border-t-0  border-b-grayscale-placeholder bg-transparent text-center text-lg font-bold text-grayscale-white transition duration-200 placeholder:font-normal focus:border-brand-principal focus:outline-none"
              placeholder={'00'}
              step={5}
              min={5}
              max={60}
            />
            <label htmlFor={'minutes'} className={'text-lg font-bold'}>
              minutos
            </label>
          </section>

          <TimerCounter />

          <Button
            variant={'start'}
            disabled={false}
            onClick={() => console.log('start')}
          />
        </form>
      </motion.div>
    </AnimatePresence>
  )
}
