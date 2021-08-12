import React, { useRef, useEffect, useState } from 'react'
import { TabType } from './Tabs'
import './Tab.scss'

export const Tab: React.FC<{
  tab: TabType
  onClick: () => void
  isActive: boolean
  color: string
  hoverColors: { color: string; backgroundColor: string }
  onIsActiveChange: (placement: { left: number; width: number }) => void
}> = ({ tab, onClick, isActive, color, hoverColors, onIsActiveChange }) => {
  const [hovering, setHovering] = useState(false)
  const tabRef = useRef<HTMLLIElement>(null)
  const { isDisabled, label } = tab

  useEffect(() => {
    // update placement as active tab changes
    if (!(tabRef.current && isActive)) return
    onIsActiveChange({
      width: tabRef.current.offsetWidth,
      left: tabRef.current.offsetLeft,
    })
  }, [isActive, onIsActiveChange])

  const style = {
    color: hovering ? hoverColors.color : color,
    ...(hovering && { backgroundColor: hoverColors.backgroundColor }),
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === 'Space') onClick()
  }

  return (
    <li
      ref={tabRef}
      role="tab"
      aria-selected={isActive}
      aria-disabled={isDisabled}
      className={`Tab ${isActive ? 'Tab--is-active' : ''} ${
        isDisabled ? 'Tab--is-disabled' : ''
      }`}
      onKeyPress={handleKeyPress}
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={style}
    >
      <div className="Tab__label">{label}</div>
    </li>
  )
}
