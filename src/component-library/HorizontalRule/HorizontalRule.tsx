import React from 'react'
import { ColorTokensWithLighterAndDarkerType } from '../Text'
import './HorizontalRule.scss'
import { getColors } from '../../Helpers'

export const HorizontalRule: React.FC<{
  on?: ColorTokensWithLighterAndDarkerType
}> = ({ on }) => {
  const style = () => {
    if (!on) return {}
    const {
      hovered: { backgroundColor },
    } = getColors(on)
    return { backgroundColor }
  }
  return <div className="HorizontalRule" aria-hidden style={style()} />
}
