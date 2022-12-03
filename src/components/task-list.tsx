/* eslint-disable react/display-name */
import { formatDistance, subMonths } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { memo } from 'react'
import shortid from 'shortid'
import { PomodoroTask, TaskStatus } from '../services/usePomodoro'
import { motion } from 'framer-motion'

interface TaskListProps {
  tasks: PomodoroTask[]
}

const TableElement = memo(({ children }: { children: React.ReactNode }) => (
  <td
    className={
      'border-t-4 border-t-grayscale-background bg-grayscale-elements p-4 text-left text-sm leading-6 text-grayscale-text first:w-1/2 first:pl-6 last:pr-6'
    }
  >
    {children}
  </td>
))

const StatusElement = memo(({ status }: { status: TaskStatus }) => {
  const statusColor: Record<TaskStatus, string> = {
    [TaskStatus.IN_PROGRESS]: 'bg-[#FBA94C]',
    [TaskStatus.COMPLETED]: 'bg-brand-light',
    [TaskStatus.PAUSED]: 'bg-error-assets'
  }

  return (
    <div className={'inline-flex items-center gap-3'}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          opacity: [1, 0.5, 0.5, 1, 1]
        }}
        transition={{
          duration: 1.5,
          loop: Infinity
        }}
        className={`h-2 w-2 rounded-full ${statusColor[status]}`}
      />
      {status}
    </div>
  )
})

const tableHeader = ['Tarefa', 'Duração', 'Início', 'Status']

function TaskList({ tasks }: TaskListProps) {
  const aux: PomodoroTask[] = [
    {
      id: '1',
      name: 'Estudar React',
      duration: 25,
      status: TaskStatus.IN_PROGRESS,
      startedAt: subMonths(new Date(), 2)
    },
    {
      id: '1',
      name: 'Estudar React',
      duration: 25,
      status: TaskStatus.COMPLETED,
      startedAt: subMonths(new Date(), 2)
    },
    {
      id: '1',
      name: 'Estudar React',
      duration: 25,
      status: TaskStatus.PAUSED,
      startedAt: subMonths(new Date(), 2)
    },
    {
      id: '1',
      name: 'Estudar React',
      duration: 25,
      status: TaskStatus.IN_PROGRESS,
      startedAt: subMonths(new Date(), 2)
    },
    {
      id: '1',
      name: 'Estudar React',
      duration: 25,
      status: TaskStatus.IN_PROGRESS,
      startedAt: subMonths(new Date(), 2)
    },
    {
      id: '1',
      name: 'Estudar React',
      duration: 25,
      status: TaskStatus.IN_PROGRESS,
      startedAt: subMonths(new Date(), 2)
    }
  ]
  return (
    <div className={'mt-8 grow overflow-auto'}>
      <table className={'w-full min-w-[600px] border-collapse'}>
        <thead>
          {tableHeader.map((header) => (
            <th
              key={shortid.generate()}
              className={
                'bg-grayscale-divider p-4 text-left text-sm leading-6 text-grayscale-white first:rounded-tl-default first:pl-6 last:rounded-tr-default last:pr-6'
              }
            >
              {header}
            </th>
          ))}
        </thead>
        <tbody>
          {aux.map((task) => (
            <tr key={shortid.generate()}>
              <TableElement>{task.name}</TableElement>
              <TableElement>{task.duration}</TableElement>
              <TableElement>
                {formatDistance(task.startedAt, new Date(), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </TableElement>
              <TableElement>
                <StatusElement status={task.status} />
              </TableElement>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(TaskList)
