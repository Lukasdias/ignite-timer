/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { toast } from 'react-hot-toast'

export enum TaskStatus {
  IN_PROGRESS = 'Em andamento',
  PAUSED = 'Interrompido',
  COMPLETED = 'Concluído'
}

export type PomodoroTask = {
  id: string
  name: string
  duration: number
  status: TaskStatus
  startedAt: Date
  isTheLastTaskUpdated: boolean
}

const success = () => toast.success('Tarefa adicionada com sucesso!')
const error = () => toast.error('Erro ao adicionar tarefa!')
const successEdit = () => toast.success('Tarefa editada com sucesso!')
const errorEdit = () => toast.error('Erro ao editar tarefa!')
const successRemove = () => toast.success('Tarefa removida com sucesso!')
const errorRemove = () => toast.error('Erro ao remover tarefa!')
const successPause = () => toast.success('Tarefa pausada com sucesso!')
const errorPause = () => toast.error('Erro ao pausar tarefa!')
const successResume = () => toast.success('Tarefa retomada com sucesso!')
const errorResume = () => toast.error('Erro ao retomar tarefa!')
const successComplete = () => toast.success('Tarefa concluída com sucesso!')
const errorComplete = () => toast.error('Erro ao concluir tarefa!')
const incomingTask = () => toast.custom('Tarefa perto do fim!')

const pomodoro = atomWithStorage<PomodoroTask[]>('@ignite-timer', [])

const amountSecondsPassedAtom = atomWithStorage('@ignite-timer-seconds', '0')

const changeAmountSecondsPassedAtom = atom(
  null,
  (get, set, newAmount: number) => {
    set(amountSecondsPassedAtom, newAmount.toString())
  }
)

const addPomodoro = atom(null, (get, set, newTask: PomodoroTask) => {
  const currentTasks = get(pomodoro)
  const disabledActiveTask = currentTasks.map((task) => {
    if (task.status === TaskStatus.IN_PROGRESS) {
      task.status = TaskStatus.PAUSED
    }
    task.isTheLastTaskUpdated = false
    return task
  })
  set(amountSecondsPassedAtom, '0')
  set(pomodoro, [...disabledActiveTask, newTask])
  success()
})

const editPomodoro = atom(null, (get, set, editedTask: PomodoroTask) => {
  const currentTasks = get(pomodoro)
  const taskIndex = currentTasks.findIndex((task) => task.id === editedTask.id)
  currentTasks[taskIndex] = editedTask
  set(pomodoro, [...currentTasks])
  successEdit()
})

const removePomodoro = atom(null, (get, set, id: string) => {
  const currentTasks = get(pomodoro)
  set(pomodoro, currentTasks.filter((task) => task.id !== id) ?? get(pomodoro))
  successRemove()
})

const getActiveTask = atom((get) => {
  const currentTasks = get(pomodoro)
  return currentTasks.find((task) => task.status === TaskStatus.IN_PROGRESS)
})

const getActiveTaskTimer = atom((get) => {
  const activeTask = get(getActiveTask)
  const amountSecondsPassed = get(amountSecondsPassedAtom)
  const totalSeconds = activeTask ? activeTask.duration * 60 : 0
  const currentSeconds = activeTask
    ? totalSeconds - parseInt(amountSecondsPassed)
    : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  if (activeTask) {
    document.title = `${minutes}:${seconds} - Pomodoro`
  }

  return {
    minutes,
    seconds
  }
})

const getCompletedTasks = atom((get) => {
  const currentTasks = get(pomodoro)
  return currentTasks.filter((task) => task.status === TaskStatus.COMPLETED)
})

const getPausedTasks = atom((get) => {
  const currentTasks = get(pomodoro)
  return currentTasks.filter((task) => task.status === TaskStatus.PAUSED)
})

export const usePomodoro = () => {
  const [tasks, setTasks] = useAtom(pomodoro)
  const [activeTask] = useAtom(getActiveTask)
  const [completedTasks] = useAtom(getCompletedTasks)
  const [pausedTasks] = useAtom(getPausedTasks)
  const [, addTask] = useAtom(addPomodoro)
  const [, editTask] = useAtom(editPomodoro)
  const [, removeTask] = useAtom(removePomodoro)
  const [currentTimer] = useAtom(getActiveTaskTimer)
  const [, changeAmountSecondsPassed] = useAtom(changeAmountSecondsPassedAtom)

  function stopTimer() {
    if (!activeTask) return
    const taskIndex = tasks.findIndex((task) => task.id === activeTask.id)
    tasks[taskIndex].status = TaskStatus.PAUSED
    tasks[taskIndex].isTheLastTaskUpdated = true
    setTasks([...tasks])
    successPause()
  }

  function startTimer() {
    if (!activeTask) return
    const taskIndex = tasks.findIndex((task) => task.isTheLastTaskUpdated)
    tasks[taskIndex].status = TaskStatus.IN_PROGRESS
    setTasks([...tasks])
    successResume()
  }

  useEffect(() => {
    console.log('activeTask', activeTask)
    if (!activeTask) return
    const interval = setInterval(() => {
      changeAmountSecondsPassed(
        differenceInSeconds(new Date(), activeTask?.startedAt)
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [activeTask])

  return {
    tasks,
    activeTask,
    completedTasks,
    pausedTasks,
    setTasks,
    addTask,
    editTask,
    removeTask,
    currentTimer,
    startTimer,
    stopTimer
  }
}
