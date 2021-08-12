import React from 'react'
import { ColorTokensWithLighterAndDarkerType } from '../Text'
import './SideMenu.scss'

export const SideMenu: React.FC<{
  on?: ColorTokensWithLighterAndDarkerType
  width?: string
}> = ({ on, width, children }) => {
  const color = `var(--text-on-${on})`
  const backgroundColor = `var(--color-${on})`

  const style = () => {
    const widthStyle = width ? { width } : {}
    return on ? { color, backgroundColor, ...widthStyle } : widthStyle
  }
  return (
    <div className="SideMenu" style={style()}>
      {children}
    </div>
  )
}
