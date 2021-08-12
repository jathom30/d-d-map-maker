import React from 'react'
import './MinMaxSliderOld.scss'

export const MinMaxSliderOld = ({
  minMax = [0, 100],
  range = [0, 100],
  step = 1,
  onChange,
}: {
  minMax?: [number, number]
  range?: [number, number]
  step?: number
  onChange?: (newMinMax: [number, number]) => void
}) => {
  const [min, max] = minMax
  const handleOnChange = (value: number, type: 'min' | 'max') => {
    if (onChange) {
      if (type === 'min') onChange([value, value > max ? value : max])
      if (type === 'max') onChange([value < min ? value : min, value])
    }
  }

  return (
    <div className="MinMaxSliderOld">
      <input
        className="MinMaxSliderOld__input"
        type="range"
        value={min}
        min={range[0]}
        max={range[1]}
        step={step}
        onChange={(e) => handleOnChange(+e.target.value, 'min')}
      />
      <input
        className="MinMaxSliderOld__input"
        type="range"
        value={max}
        min={range[0]}
        max={range[1]}
        step={step}
        onChange={(e) => handleOnChange(+e.target.value, 'max')}
      />
    </div>
  )
}
