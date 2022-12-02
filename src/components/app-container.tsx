import { Outlet } from 'react-router-dom'
import Header from './header'
import { AnimatePresence, motion } from 'framer-motion'

function AppContainer() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 300 }}
        transition={{ duration: 0.5 }}
        className={
          'flex h-4/5 max-h-[744px] w-11/12 max-w-[1120px] flex-col overflow-hidden rounded-lg bg-grayscale-elements p-10'
        }
      >
        <Header />
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}
export default AppContainer
