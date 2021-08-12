import React, { ReactNode } from 'react'
import './HeaderNav.scss'

export const HeaderNav = ({
  children,
  marginRight,
  marginLeft,
}: {
  children: ReactNode
  marginRight?: string
  marginLeft?: string
}) => {
  return (
    <div className="HeaderNav" style={{ marginRight, marginLeft }}>
      {children}
    </div>
  )
}
