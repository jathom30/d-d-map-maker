import React from 'react'
import './LoadingBar.scss'

export const LoadingBar: React.FC<{
  percentage?: number
  colorKind?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'grey'
    | 'success'
    | 'warning'
    | 'danger'
}> = ({ percentage, colorKind = 'grey' }) => {
  const hasPercentage = () => {
    if (typeof percentage === 'number') {
      return {
        width: percentage,
        animation: 'basic-transition',
      }
    }
    return {
      width: undefined,
      animation: 'is-flowing',
    }
  }

  return (
    <div
      className="LoadingBar"
      style={{ backgroundColor: `var(--color-${colorKind}-100)` }}
    >
      <div
        className={`LoadingBar__bar LoadingBar__bar--${
          hasPercentage().animation
        }`}
        style={{
          width: `${hasPercentage().width}%`,
          backgroundColor: `var(--color-${colorKind}-300)`,
        }}
      />
    </div>
  )
}
