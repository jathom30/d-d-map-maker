import React from 'react'
import { ColorTokensWithLighterAndDarkerType } from '../Text'
import { getColors } from '../../Helpers'
import './VerticalRule.scss'

export const VerticalRule: React.FC<{
  on?: ColorTokensWithLighterAndDarkerType
}> = ({ on }) => {
  const style = () => {
    if (!on) return {}
    const {
      hovered: { backgroundColor },
    } = getColors(on)
    return { backgroundColor }
  }
  return <div className="VerticalRule" aria-hidden style={style()} />
}
