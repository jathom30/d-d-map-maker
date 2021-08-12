import React, { ReactNode } from 'react'
import './Sidebar.scss'

export const Sidebar: React.FC<{
  elements: ReactNode
  side?: 'left' | 'right'
  footer?: ReactNode
}> = ({ elements, footer, side = 'left', children }) => {
  return (
    <div className={`Sidebar Sidebar--${side}`}>
      <div className="Sidebar__bar">
        {elements}
        {footer && <div className="Sidebar__footer">{footer}</div>}
      </div>
      <div
        className={`Sidebar__body ${
          side === 'left' ? 'Sidebar__body--left' : 'Sidebar__body--right'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
