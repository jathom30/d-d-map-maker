import React, { ReactNode, useRef, useState } from 'react'
import './HeaderDropdown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useOnClickOutside } from 'Hooks'
import { getColors } from '../../Helpers'
import { ColorTokensWithLighterAndDarkerType } from '../Text'

export const HeaderDropdown = ({
  children,
  name,
  icon,
  position = 'right',
  on,
  kind,
  hasDropdownIcon = true,
}: {
  children: ReactNode
  position?: 'left' | 'right'
  on?: ColorTokensWithLighterAndDarkerType
  kind?: 'primary' | 'secondary' | 'tertiary'
  hasDropdownIcon?: boolean
} & (
  | { name?: undefined; icon: JSX.Element }
  | { name: string; icon?: JSX.Element }
)) => {
  const [hovering, setHovering] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  const style = () => {
    if (!on) return {}
    const { colors, hovered } = getColors(on, kind)
    return hovering ? hovered : colors
  }

  return (
    /*eslint-disable */
    <div
      className={
        'HeaderDropdown' +
        ` HeaderDropdown--position-${position}` +
        (open ? ' HeaderDropdown--is-open' : '')
      }
      style={style()}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      ref={ref}
    >
      <button
        className="HeaderDropdown__button"
        type="button"
        onClick={() => {
          setOpen(!open)
        }}
      >
        {!!icon && (
          <span
            className={`${children && name ? 'HeaderDropdown__iconLeft' : ''}`}
          >
            {icon}
          </span>
        )}
        {!!name && name}
        {hasDropdownIcon && (
          <FontAwesomeIcon
            className={`HeaderDropdown__icon ${
              open ? 'HeaderDropdown__icon--is-open' : ''
            }`}
            icon={faChevronDown}
          />
        )}
      </button>
      {open && <div className="HeaderDropdown__options">{children}</div>}
    </div>
  )
}
