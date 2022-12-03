import { memo } from 'react'
import { PomodoroTask } from '../services/usePomodoro'

interface TaskItemProps {
  task: PomodoroTask
}

function TaskItem({ task }: TaskItemProps) {
  return <div>{task.name}</div>
}

export default memo(TaskItem)
