/* eslint-disable react-hooks/exhaustive-deps */
import { motion, AnimatePresence } from 'framer-motion'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { PomodoroTask, TaskStatus, usePomodoro } from '../services/usePomodoro'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Button from './../components/button'
import { TimerCounter } from './../components/timer-counter'
import shortid from 'shortid'

const newCycleSchema = zod.object({
  task: zod.string().min(1, { message: 'O nome do projeto é obrigatório' }),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
    .int('O ciclo precisa ser um número inteiro')
})

type NewCycleFormData = zod.infer<typeof newCycleSchema>

export default function Home() {
  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0
      }
    })

  const { addTask, currentTimer } = usePomodoro()

  const handleCreateNewCycle = useCallback((data: NewCycleFormData) => {
    if (!data) return
    const pomodoro: PomodoroTask = {
      id: shortid.generate(),
      duration: data.minutesAmount,
      name: data.task,
      startedAt: new Date(),
      status: TaskStatus.IN_PROGRESS,
      isTheLastTaskUpdated: true
    }
    addTask(pomodoro)
    reset()
  }, [])

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task || !minutesAmount

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex grow flex-col items-center justify-center px-60 py-14"
      >
        <form
          className="flex h-full w-full flex-col items-center gap-9"
          onSubmit={handleSubmit(handleCreateNewCycle)}
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
              {...register('task')}
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
              {...register('minutesAmount', {
                valueAsNumber: true
              })}
            />
            <label htmlFor={'minutes'} className={'text-lg font-bold'}>
              minutos
            </label>
          </section>

          <TimerCounter
            minutes={currentTimer.minutes}
            seconds={currentTimer.seconds}
          />

          <Button
            variant={'start'}
            disabled={isSubmitDisabled}
            onClick={() => {}}
          />
        </form>
      </motion.div>
    </AnimatePresence>
  )
}
