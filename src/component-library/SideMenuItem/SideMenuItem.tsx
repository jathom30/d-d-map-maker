import React, { ReactNode, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ColorTokensWithLighterAndDarkerType, Spacer } from '..'
import './SideMenuItem.scss'
import { getColors } from '../../Helpers'

interface HeaderItemCommonPropsType {
  icon?: JSX.Element
  label: ReactNode
  on?: ColorTokensWithLighterAndDarkerType
  kind?: 'primary' | 'secondary' | 'tertiary'
  childDepth?: 1 | 2 | 3
  isActive?: boolean
}

interface HeaderItemWithLinkPropsType {
  to: string
  onClick?: undefined
}

interface HeaderItemWithOnClickPropsType {
  to?: undefined
  onClick: () => void
}

interface HeaderItemWithoutClickPropsType {
  to?: undefined
  onClick?: undefined
}
type HeaderItemPropsType = HeaderItemCommonPropsType &
  (
    | HeaderItemWithLinkPropsType
    | HeaderItemWithOnClickPropsType
    | HeaderItemWithoutClickPropsType
  )

export const SideMenuItem: React.FC<HeaderItemPropsType> = ({
  icon,
  label,
  childDepth,
  isActive,
  to,
  on,
  kind,
  onClick,
}) => {
  const [hovering, setHovering] = useState(false)
  const style = () => {
    if (!on) return {}
    const { colors, hovered } = getColors(on, kind)
    if (isActive) return hovered
    return hovering ? hovered : colors
  }
  const body = (
    <>
      {childDepth && <div style={{ minWidth: `${childDepth}rem` }} />}
      {icon}
      {icon && <Spacer width="0.5rem" />}
      <span className="SideMenuItem__label">{label}</span>
    </>
  )
  if (to) {
    return (
      <NavLink
        to={to}
        style={style()}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`SideMenuItem ${
          childDepth ? 'SideMenuItem--is-child' : ''
        } ${isActive ? 'SideMenuItem--is-active' : ''}`}
      >
        {body}
      </NavLink>
    )
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        style={style()}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`SideMenuItem ${childDepth ? 'SideMenuItem--is-child' : ''}`}
      >
        {body}
      </button>
    )
  }
  return (
    <div
      className={`SideMenuItem SideMenuItem--is-not-clickable ${
        childDepth ? 'SideMenuItem--is-child' : ''
      }`}
      style={style()}
    >
      {body}
    </div>
  )
}
