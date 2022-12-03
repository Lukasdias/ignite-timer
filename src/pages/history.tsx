import { motion, AnimatePresence } from 'framer-motion'
import TaskList from '../components/task-list'
import { usePomodoro } from '../services/usePomodoro'

export default function History() {
  const { tasks } = usePomodoro()
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex flex-1 flex-col justify-start gap-8 p-14"
      >
        <h2 className={'text-2xl font-bold text-grayscale-title'}>
          Meu Histórico
        </h2>
        <TaskList tasks={tasks} />
      </motion.div>
    </AnimatePresence>
  )
}
