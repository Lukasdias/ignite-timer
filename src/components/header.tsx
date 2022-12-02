/* eslint-disable react-hooks/exhaustive-deps */
import Logo from './../assets/ignite-logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import Tooltip from './tooltip'

export default function Header() {
  return (
    <header className="mb-[50px] flex w-full items-center justify-between">
      <img src={Logo} alt="ignite logo" width={40} height={40} />
      <div className={'flex items-center gap-5'}>
        <Tooltip
          text={'Timer'}
          trigger={
            <NavLink
              to="/"
              title="Timer"
              className={({ isActive }) =>
                isActive ? 'text-brand-principal' : 'text-grayscale-white'
              }
            >
              <Timer
                size={24}
                weight="bold"
                className={`group cursor-pointer border-b-2 border-b-transparent transition duration-200 hover:border-brand-principal  
              `}
              />
            </NavLink>
          }
        />
        <Tooltip
          text={'Histórico'}
          trigger={
            <NavLink
              to="/history"
              title="Histórico"
              className={({ isActive }) =>
                isActive ? 'text-brand-principal' : 'text-grayscale-white'
              }
            >
              <Scroll
                size={24}
                weight="bold"
                className={`cursor-pointer border-b-2 border-b-transparent transition duration-200 hover:border-brand-principal `}
              />
            </NavLink>
          }
        />
      </div>
    </header>
  )
}
