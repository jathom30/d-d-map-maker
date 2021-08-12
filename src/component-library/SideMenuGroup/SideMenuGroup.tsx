import React from 'react'
import './SideMenuGroup.scss'

export const SideMenuGroup: React.FC<{
  main: JSX.Element
  isOpen?: boolean
}> = ({ main, isOpen = true, children }) => {
  return (
    <div className="SideMenuGroup">
      {main}
      {isOpen && children}
    </div>
  )
}
