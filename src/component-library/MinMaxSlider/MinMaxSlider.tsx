import React from 'react'
import {
  defaultSliderThumbSizeInRem,
  SliderBarFill,
  SliderThumb,
  SliderTrack,
} from '..'
import { SliderBar } from '../SliderBar'

export const MinMaxSlider = ({
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
      className="MinMaxSlider"
      style={{ padding: `calc(${defaultSliderThumbSizeInRem}rem / 2)` }}
    >
      <SliderTrack
        min={min}
        max={max}
        bar={({ valueToPercent }) => {
          // These offsets solves a visual bug where the ends of the fill bar
          // don't stay lined up with the centers of the thumb. This visual
          // bug shows up when using a round thumb and causes the ends of the
          // fill bar to become visible outside of the thumb when at the ends
          // of the range. To see the bug, try removing the 'minOffsetInRem'
          // value from the CSS calc below, then set the thumb opacity to 0.5.
          // It'll be pretty obvious then. This only happens in sliders that
          // use the negative margin technique to keep the thumb from over-
          // hanging the ends of the track.
          const minValuePct = valueToPercent(minValue)
          const minOffset = ((minValuePct - 50) / 100) * -1
          const minOffsetInRem = minOffset * defaultSliderThumbSizeInRem

          const maxValuePct = valueToPercent(maxValue)
          const maxOffset = ((maxValuePct - 50) / 100) * -1
          const maxOffsetInRem = maxOffset * defaultSliderThumbSizeInRem

          return (
            <div
              style={{
                margin: `0 calc(${defaultSliderThumbSizeInRem}rem / 2 * -1)`,
              }}
            >
              <SliderBar>
                <SliderBarFill
                  left={`calc(${minValuePct}% + ${minOffsetInRem}rem)`}
                  width={`calc(${
                    maxValuePct - minValuePct
                  }% - ${minOffsetInRem}rem + ${maxOffsetInRem}rem)`}
                />
              </SliderBar>
            </div>
          )
        }}
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
            />

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
            />
          </>
        )}
      </SliderTrack>
    </div>
  )
}
