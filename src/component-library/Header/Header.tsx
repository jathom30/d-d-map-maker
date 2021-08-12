import React, { ReactNode } from 'react'
import { StandardLonghandProperties } from 'csstype'
import { ColorTokensWithLighterAndDarkerType } from '../Text'

import './Header.scss'

export const Header = ({
  justifyContent,
  on,
  children,
}: {
  justifyContent?: StandardLonghandProperties['justifyContent']
  on?: ColorTokensWithLighterAndDarkerType
  children: ReactNode
}) => {
  const color = `var(--text-on-${on})`
  const backgroundColor = `var(--color-${on})`

  const style = {
    justifyContent,
    ...(!!on && { color, backgroundColor }),
  }
  return (
    <div className="Header" style={style}>
      {children}
    </div>
  )
}
