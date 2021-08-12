import classNames from 'classnames'
import React from 'react'
import {
  defaultSliderThumbSizeInRem,
  SliderBarFill,
  SliderThumb,
  SliderTrack,
} from '..'
import { SliderBar } from '../SliderBar'
import './MinMaxSliderPrecise.scss'

export const MinMaxSliderPrecise = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  microStepMultiplier,
  macroStepMultiplier,
  'aria-label': ariaLabel,
}: {
  value: [number, number]
  onChange: (newValue: [number, number]) => void
  min?: number
  max?: number
  step?: number
  microStepMultiplier?: number
  macroStepMultiplier?: number
  'aria-label': string
}) => {
  const [minValue, maxValue] = value

  const handleChange = (newValue: number, type: 'min' | 'max') => {
    const newValues: Record<'min' | 'max', [number, number]> = {
      min: [newValue, newValue > maxValue ? newValue : maxValue],
      max: [newValue < minValue ? newValue : minValue, newValue],
    }
    onChange(newValues[type])
  }

  return (
    <div
      className="MinMaxSliderPricise"
      style={{
        padding: `${defaultSliderThumbSizeInRem}rem ${defaultSliderThumbSizeInRem}rem 0`,
      }}
    >
      <SliderTrack
        min={min}
        max={max}
        bar={(props) => (
          <SliderBar>
            <SliderBarFill
              left={`${props.valueToPercent(minValue)}%`}
              width={`${
                props.valueToPercent(maxValue) - props.valueToPercent(minValue)
              }%`}
            />
          </SliderBar>
        )}
      >
        {(props) => (
          <>
            {/* Min */}
            <SliderThumb
              value={minValue}
              min={min}
              max={max}
              step={step}
              microStepMultiplier={microStepMultiplier}
              macroStepMultiplier={macroStepMultiplier}
              aria-label={ariaLabel}
              sliderTrackRef={props.sliderTrackRef}
              onChange={(newValue) => handleChange(newValue, 'min')}
            >
              {(_props) => (
                <div
                  className={classNames(
                    'MinMaxSliderPrecise__thumb',
                    'MinMaxSliderPrecise__thumb--min',
                    {
                      'MinMaxSliderPrecise__thumb--has-keyboard-focus':
                        _props.hasKeyboardFocus,
                      'MinMaxSliderPrecise__thumb--is-dragging':
                        _props.isDragging,
                    },
                  )}
                />
              )}
            </SliderThumb>

            {/* Max */}
            <SliderThumb
              value={maxValue}
              min={min}
              max={max}
              step={step}
              microStepMultiplier={microStepMultiplier}
              macroStepMultiplier={macroStepMultiplier}
              aria-label={ariaLabel}
              sliderTrackRef={props.sliderTrackRef}
              onChange={(newValue) => handleChange(newValue, 'max')}
            >
              {(_props) => (
                <div
                  className={classNames(
                    'MinMaxSliderPrecise__thumb',
                    'MinMaxSliderPrecise__thumb--max',
                    {
                      'MinMaxSliderPrecise__thumb--has-focus': _props.hasFocus,
                      'MinMaxSliderPrecise__thumb--has-keyboard-focus':
                        _props.hasKeyboardFocus,
                      'MinMaxSliderPrecise__thumb--is-dragging':
                        _props.isDragging,
                    },
                  )}
                />
              )}
            </SliderThumb>
          </>
        )}
      </SliderTrack>
    </div>
  )
}
