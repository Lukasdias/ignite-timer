/* eslint-disable react/display-name */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext } from 'react'
import { toast } from 'react-hot-toast'

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

export type PomodoroContextData = {
  tasks: PomodoroTask[]
  lastTaskUpdated: PomodoroTask | null
  timer: {
    minutes: string
    seconds: string
  }
  activeTask: PomodoroTask | undefined
  completedTasks: PomodoroTask[]
  pausedTasks: PomodoroTask[]
  addTask: (newTask: PomodoroTask) => void
  editTask: (editedTask: PomodoroTask) => void
  removeTask: (id: string) => void
  pauseTask: (id: string) => void
  resumeTask: (id: string) => void
  completeTask: (id: string) => void
  clearLocalStorage: () => void
}

const PomodoroContext = createContext({} as PomodoroContextData)

export const PomodoroProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [tasks, setTasks] = useState<PomodoroTask[]>([])
  const [timer, setTimer] = useState({
    minutes: '00',
    seconds: '00'
  })

  const activeTask = useMemo(() => {
    return tasks.find((task) => task.status === TaskStatus.IN_PROGRESS)
  }, [tasks])
  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.status === TaskStatus.COMPLETED)
  }, [tasks])
  const pausedTasks = useMemo(() => {
    return tasks.filter((task) => task.status === TaskStatus.PAUSED)
  }, [tasks])

  const [lastTaskUpdated, setLastTaskUpdated] = useState<PomodoroTask | null>(
    null
  )

  const addTask = (newTask: PomodoroTask) => {
    try {
      const disabledActiveTask = tasks.map((task) => {
        if (task.status === TaskStatus.IN_PROGRESS) {
          task.status = TaskStatus.PAUSED
        }
        task.isTheLastTaskUpdated = false
        return task
      })
      setLastTaskUpdated(newTask)
      setTasks([...disabledActiveTask, newTask])
      success()
    } catch {
      error()
    }
  }

  const editTask = (editedTask: PomodoroTask) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === editedTask.id)
      tasks[taskIndex] = editedTask
      setLastTaskUpdated(editedTask)
      setTasks([...tasks])
      successEdit()
    } catch {
      errorEdit()
    }
  }

  const removeTask = (id: string) => {
    try {
      const filteredTasks = tasks.filter((task) => task.id !== id)
      setTasks([...filteredTasks])
      successRemove()
    } catch {
      errorRemove()
    }
  }

  const pauseTask = (id: string) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === id)
      tasks[taskIndex].status = TaskStatus.PAUSED
      setLastTaskUpdated(tasks[taskIndex])
      setTasks([...tasks])
      successPause()
    } catch {
      errorPause()
    }
  }

  const resumeTask = (id: string) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === id)
      tasks[taskIndex].status = TaskStatus.IN_PROGRESS
      setLastTaskUpdated(tasks[taskIndex])
      setTasks([...tasks])
      successResume()
    } catch {
      errorResume()
    }
  }

  const completeTask = (id: string) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === id)
      tasks[taskIndex].status = TaskStatus.COMPLETED
      setLastTaskUpdated(tasks[taskIndex])
      setTasks([...tasks])
      successComplete()
    } catch {
      errorComplete()
    }
  }

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem('@Pomodoro:tasks')
    localStorage.removeItem('@Pomodoro:lastTaskUpdated')
    localStorage.removeItem('@Pomodoro:timer')
  }, [])

  useEffect(() => {
    const cachedTasks = JSON.parse(
      localStorage.getItem('@Pomodoro:tasks') || '[]'
    )
    const cachedLastTaskUpdated = JSON.parse(
      localStorage.getItem('@Pomodoro:lastTaskUpdated') || 'null'
    )
    const cachedTimer = JSON.parse(
      localStorage.getItem('@Pomodoro:timer') || '{}'
    )
    setTasks(cachedTasks)
    setLastTaskUpdated(cachedLastTaskUpdated)
    setTimer(cachedTimer)
  }, [])

  useEffect(() => {
    localStorage.setItem('@Pomodoro:tasks', JSON.stringify(tasks))
    localStorage.setItem(
      '@Pomodoro:lastTaskUpdated',
      JSON.stringify(lastTaskUpdated)
    )
    localStorage.setItem('@Pomodoro:timer', JSON.stringify(timer))
  }, [tasks, lastTaskUpdated, timer])

  return (
    <PomodoroContext.Provider
      value={{
        tasks,
        timer,
        activeTask,
        completedTasks,
        pausedTasks,
        addTask,
        editTask,
        removeTask,
        pauseTask,
        resumeTask,
        completeTask,
        lastTaskUpdated,
        clearLocalStorage
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}

export const usePomodoro = () => {
  const context = useContext(PomodoroContext)
  if (!context) {
    throw new Error('usePomodoro must be used within a PomodoroProvider')
  }
  return context
}
