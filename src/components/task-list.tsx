/* eslint-disable react/display-name */
import { formatDistanceStrict, subDays, subMonths } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { memo, useCallback, useMemo, useState } from 'react'
import shortid from 'shortid'
import { PomodoroTask, TaskStatus, usePomodoro } from '../services/usePomodoro'
import { motion } from 'framer-motion'
import { addDays } from 'date-fns/esm'

interface TaskListProps {
  tasks: PomodoroTask[]
}

export enum TableHeader {
  TASK = 'Tarefa',
  DURATION = 'Duração',
  START_DATE = 'Início',
  STATUS = 'Status'
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

const tableHeader: TableHeader[] = [
  TableHeader.TASK,
  TableHeader.DURATION,
  TableHeader.START_DATE,
  TableHeader.STATUS
]

function TaskList({ tasks }: TaskListProps) {
  function handleFilterByHeader(header: TableHeader) {
    const sortedTasks = [...tasks]
    switch (header) {
      case TableHeader.TASK:
        sortedTasks.sort((a, b) => a.name.localeCompare(b.name))
        break
      case TableHeader.DURATION:
        sortedTasks.sort((a, b) => a.duration - b.duration)
        break
      case TableHeader.START_DATE:
        break
      case TableHeader.STATUS:
        sortedTasks.sort((a, b) => a.status.localeCompare(b.status))
        break
    }
    return sortedTasks
  }

  const [currentHeader, setCurrentHeader] = useState<TableHeader>(
    TableHeader.TASK
  )

  const handleChangeHeader = useCallback(
    (header: TableHeader) => {
      setCurrentHeader(header)
    },
    [currentHeader]
  )

  const current = useMemo(
    () => handleFilterByHeader(currentHeader),
    [currentHeader]
  )

  if (current.length === 0)
    return (
      <div
        className={
          'flex-col text-center text-2xl font-bold text-grayscale-text'
        }
      >
        Nenhuma tarefa encontrada
      </div>
    )

  return (
    <div className={'w-full grow overflow-auto'}>
      <table className={'w-full min-w-[600px] border-collapse overflow-y-auto'}>
        <thead>
          {tableHeader.map((header) => (
            <th
              key={shortid.generate()}
              className={
                'cursor-pointer bg-grayscale-divider p-4 text-left text-sm leading-6 text-grayscale-white transition duration-200 first:rounded-tl-default first:pl-6 last:rounded-tr-default last:pr-6 hover:text-brand-light'
              }
              onClick={() => handleChangeHeader(header)}
            >
              {header}
            </th>
          ))}
        </thead>
        <tbody>
          {current?.map((c) => (
            <tr key={shortid.generate()}>
              <TableElement>{c.name}</TableElement>
              <TableElement>{c.duration} minutos</TableElement>
              <TableElement>
                {formatDistanceStrict(subDays(new Date(), 10), new Date(), {
                  locale: ptBR,
                  addSuffix: true,
                  roundingMethod: 'floor'
                })}
              </TableElement>
              <TableElement>
                <StatusElement status={c.status} />
              </TableElement>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(TaskList)
