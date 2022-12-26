/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom'
import Header from './header'
import { AnimatePresence, motion } from 'framer-motion'
import { TimerToaster } from './timer-toaster'
import { usePomodoro } from '../services/usePomodoro'
import { useEffect } from 'react'

function AppContainer() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 300 }}
        transition={{ duration: 0.5 }}
        className={`flex  w-full max-w-[74rem] flex-col overflow-hidden rounded-lg bg-grayscale-elements p-10 sm:w-11/12`}
        style={{
          height: 'calc(100vh - 10rem)'
        }}
      >
        <Header />
        <Outlet />
        <TimerToaster />
      </motion.div>
    </AnimatePresence>
  )
}
export default AppContainer
