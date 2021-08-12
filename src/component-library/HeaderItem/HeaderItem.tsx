import React, { ReactNode, useState } from 'react'
import './HeaderItem.scss'
import { NavLink } from 'react-router-dom'
import { getColors } from '../../Helpers'
import { ColorTokensWithLighterAndDarkerType } from '../Text'

interface HeaderItemCommonPropsType {
  children?: ReactNode
  icon?: JSX.Element
  on?: ColorTokensWithLighterAndDarkerType
  kind?: 'primary' | 'secondary' | 'tertiary'
}

interface HeaderItemWithLinkPropsType {
  to: string
  onClick?: undefined
}

interface HeaderItemWithOnClickPropsType {
  to?: undefined
  onClick: () => void
}

type HeaderItemPropsType = HeaderItemCommonPropsType &
  (HeaderItemWithLinkPropsType | HeaderItemWithOnClickPropsType)

export const HeaderItem = ({
  to,
  onClick,
  children,
  on,
  kind,
  icon,
}: HeaderItemPropsType) => {
  const [hovering, setHovering] = useState(false)
  const style = () => {
    if (!on) return {}
    const { colors, hovered } = getColors(on, kind)
    return hovering ? hovered : colors
  }

  if (to) {
    return (
      <NavLink
        className="HeaderItem"
        to={to}
        activeClassName="HeaderItem--is-active"
        style={style()}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {!!icon && (
          <span className={`${children ? 'HeaderItem__icon' : ''}`}>
            {icon}
          </span>
        )}
        {children}
      </NavLink>
    )
  }
  return (
    <button
      className="HeaderItem"
      type="button"
      style={style()}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={
        onClick
          ? () => {
              onClick()
            }
          : undefined
      }
    >
      {!!icon && (
        <span className={`${children ? 'HeaderItem__icon' : ''}`}>{icon}</span>
      )}
      {children}
    </button>
  )
}
