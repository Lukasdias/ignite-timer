import React from 'react'
import { Toaster } from 'react-hot-toast'

export const TimerToaster = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff'
          },
          success: {
            duration: 2000
          },
          error: {
            duration: 2000
          }
        }}
      />
    </>
  )
}
