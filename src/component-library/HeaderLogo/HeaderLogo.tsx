import React from 'react'
import './HeaderLogo.scss'
import { NavLink } from 'react-router-dom'

export const HeaderLogo = ({ logo, to }: { logo: string; to: string }) => {
  return (
    <NavLink to={to} className="HeaderLogo">
      <img className="HeaderLogo__image" src={logo} alt="logo" />
    </NavLink>
  )
}
