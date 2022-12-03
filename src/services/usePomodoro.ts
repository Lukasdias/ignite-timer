import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

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
}

const pomodoro = atomWithStorage<PomodoroTask[]>('@ignite-timer', [])

const addPomodoro = atom(null, (get, set, newTask: PomodoroTask) => {
  const currentTasks = get(pomodoro)
  set(pomodoro, [...currentTasks, newTask])
})

const editPomodoro = atom(null, (get, set, editedTask: PomodoroTask) => {
  const currentTasks = get(pomodoro)
  const taskIndex = currentTasks.findIndex((task) => task.id === editedTask.id)
  currentTasks[taskIndex] = editedTask
  set(pomodoro, [...currentTasks])
})

const removePomodoro = atom(null, (get, set, id: string) => {
  const currentTasks = get(pomodoro)
  set(pomodoro, currentTasks.filter((task) => task.id !== id) ?? get(pomodoro))
})

export const usePomodoro = () => {
  const [tasks, setTasks] = useAtom(pomodoro)
  const [, addTask] = useAtom(addPomodoro)
  const [, editTask] = useAtom(editPomodoro)
  const [, removeTask] = useAtom(removePomodoro)

  return {
    tasks,
    setTasks,
    addTask,
    editTask,
    removeTask
  }
}
