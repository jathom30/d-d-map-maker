import React from 'react'
import { ColorTokensWithLighterAndDarkerType } from '../Text'
import './SideMenuHeader.scss'
import { getColors } from '../../Helpers'

export const SideMenuHeader: React.FC<{
  title: string
  on?: ColorTokensWithLighterAndDarkerType
  kind?: 'primary' | 'secondary' | 'tertiary'
}> = ({ title, on, kind }) => {
  const style = () => {
    if (!on) return {}
    const { colors } = getColors(on, kind)
    return colors
  }
  return (
    <div className="SideMenuHeader" style={style()}>
      <span className="SideMenuHeader__title">{title}</span>
    </div>
  )
}
