import React from 'react'
import {
  Button,
  FlexBox,
  GridBox,
  MinMaxSliderOld,
  Spacer,
  Text,
} from 'component-library'
import { AnglePicker } from 'react-linear-gradient-picker'
import { AlphaPicker } from 'react-color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckSquare,
  faMinus,
  faPlus,
  faSquare,
} from '@fortawesome/free-solid-svg-icons'
import './FilterTab.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 as uuid } from 'uuid'
import {
  filterAngleAtom,
  filterOpacityAtom,
  filtersAtom,
  filterStartColorAtom,
  filterStartSpaceAtom,
  filterStopColorAtom,
  filterStopSpaceAtom,
  filterVisibleAtom,
} from 'State'
import { FilterType } from 'Types'
import { ColorSelect } from '..'

const FilterOpacity = () => {
  const [opacity, setOpacity] = useRecoilState(filterOpacityAtom)

  return (
    <>
      <Text on="white" size="s">
        Opacity
      </Text>
      <Spacer height=".25rem" />
      <AlphaPicker
        color={`rgba(0,0,0,${opacity})`}
        onChange={(o) => setOpacity(o.rgb.a || 0.5)}
      />
    </>
  )
}

const FilterAngle = () => {
  const [angle, setAngle] = useRecoilState(filterAngleAtom)
  return (
    <>
      <Text on="white" size="s" tag="div">
        Angle
      </Text>
      <Spacer height=".25rem" />
      <FlexBox alignItems="center" justifyContent="space-between">
        <AnglePicker size={40} angle={angle} setAngle={setAngle} />
        <div className="FilterTab__angle-input-wrapper">
          <button
            onClick={() => setAngle(angle - 1)}
            className="FilterTab__angle-button"
            type="button"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input
            className="FilterTab__angle-input"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value, 10))}
          />
          <button
            onClick={() => setAngle(angle + 1)}
            className="FilterTab__angle-button"
            type="button"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </FlexBox>
    </>
  )
}

const StartAndStopColors = () => {
  const [startColor, setStartColor] = useRecoilState(filterStartColorAtom)
  const [stopColor, setStopColor] = useRecoilState(filterStopColorAtom)

  return (
    <GridBox gridTemplateColumns="1fr 1fr" gap="1rem">
      <div>
        <Text on="white" size="s">
          Start
        </Text>
        <Spacer height=".25rem" />
        <ColorSelect
          color={startColor}
          onChange={(c) =>
            setStartColor(`rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`)
          }
        />
      </div>
      <div>
        <Text on="white" size="s">
          Stop
        </Text>
        <Spacer height=".25rem" />
        <ColorSelect
          color={stopColor}
          onChange={(c) =>
            setStopColor(`rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`)
          }
        />
      </div>
    </GridBox>
  )
}

const StartAndStopSpace = () => {
  const [start, setStart] = useRecoilState(filterStartSpaceAtom)
  const [stop, setStop] = useRecoilState(filterStopSpaceAtom)

  const handleStartStop = (startStop: [number, number]) => {
    setStart(startStop[0])
    setStop(startStop[1])
  }

  const startColor = useRecoilValue(filterStartColorAtom)
  const stopColor = useRecoilValue(filterStopColorAtom)
  return (
    <>
      <Text on="white" size="s">
        Range
      </Text>
      <Spacer height=".25rem" />
      <FlexBox flexDirection="column" alignItems="center">
        <div
          className="FilterTab__gradient-display"
          style={{
            background: `linear-gradient(to right, ${startColor} ${
              start * 100
            }%, ${stopColor} ${stop * 100}%)`,
          }}
        />
        <MinMaxSliderOld
          minMax={[start, stop]}
          range={[0, 1]}
          step={0.05}
          onChange={handleStartStop}
        />
      </FlexBox>
    </>
  )
}

const VisibleFilter = () => {
  const [visible, setVisible] = useRecoilState(filterVisibleAtom)
  return (
    <Button
      iconLeft={<FontAwesomeIcon icon={visible ? faCheckSquare : faSquare} />}
      onClick={() => setVisible(!visible)}
      kind="text"
    >
      {visible ? 'disable' : 'enable'}
    </Button>
  )
}

const FilterButton: React.FC<{ filter: FilterType }> = ({ filter }) => {
  const { angle, opacity, start, startSpace, stop, stopSpace } = filter
  const [currentAngle, setAngle] = useRecoilState(filterAngleAtom)
  const [currentOpacity, setOpacity] = useRecoilState(filterOpacityAtom)
  const [currentStart, setStartColor] = useRecoilState(filterStartColorAtom)
  const [currentStop, setStopColor] = useRecoilState(filterStopColorAtom)
  const [currentStartSpace, setStartSpace] =
    useRecoilState(filterStartSpaceAtom)
  const [currentStopSpace, setStopSpace] = useRecoilState(filterStopSpaceAtom)

  const handleClick = () => {
    setOpacity(opacity)
    setAngle(angle)
    setStartColor(start)
    setStopColor(stop)
    setStartSpace(startSpace)
    setStopSpace(stopSpace)
  }

  // check if all values match to show filter template as selected
  const selected =
    currentAngle === angle &&
    currentOpacity === opacity &&
    currentStart === start &&
    currentStop === stop &&
    currentStartSpace === startSpace &&
    currentStopSpace === stopSpace

  return (
    <button
      type="button"
      className={`FilterTab__filter-selection ${
        selected ? 'FilterTab__filter-selection--is-selected' : ''
      }`}
      onClick={handleClick}
      aria-label="filter selection"
    >
      <div
        className="FilterTab__filter-styles"
        style={{
          background: `linear-gradient(${angle}deg, ${start} ${
            startSpace * 100
          }%, ${stop} ${stopSpace * 100}%)`,
          opacity,
        }}
      />
    </button>
  )
}

const FilterTemplates = () => {
  const [filters, setFilters] = useRecoilState(filtersAtom)
  const start = useRecoilValue(filterStartColorAtom)
  const stop = useRecoilValue(filterStopColorAtom)
  const startSpace = useRecoilValue(filterStartSpaceAtom)
  const stopSpace = useRecoilValue(filterStopSpaceAtom)
  const angle = useRecoilValue(filterAngleAtom)
  const opacity = useRecoilValue(filterOpacityAtom)

  const disableAddNewFilter = () =>
    filters.some(
      (filter) =>
        filter.angle === angle &&
        filter.opacity === opacity &&
        filter.start === start &&
        filter.stop === stop &&
        filter.startSpace === startSpace &&
        filter.stopSpace === stopSpace,
    )

  const handleAddFilter = () => {
    const newFilter: FilterType = {
      id: uuid(),
      start,
      stop,
      startSpace,
      stopSpace,
      angle,
      opacity,
    }
    setFilters([...filters, newFilter])
  }

  return (
    <GridBox
      gridTemplateColumns="repeat(auto-fill, minmax(4rem, 1fr))"
      gap=".5rem"
    >
      {filters.map((filter) => (
        <FilterButton key={filter.id} filter={filter} />
      ))}
      <button
        disabled={disableAddNewFilter()}
        onClick={handleAddFilter}
        className="FilterTab__filter-selection"
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </GridBox>
  )
}

export const FilterTab: React.FC<{}> = () => {
  const visible = useRecoilValue(filterVisibleAtom)

  return (
    <div className="FilterTab">
      <FlexBox alignItems="center" justifyContent="space-between">
        <Text on="white" weight="bold">
          Filter
        </Text>
        <VisibleFilter />
      </FlexBox>
      <Spacer />
      <div
        className={`FilterTab__disable-container ${
          visible ? '' : 'FilterTab__disable-container--is-disabled'
        }`}
      >
        <StartAndStopColors />
        <Spacer />
        <FilterAngle />
        <Spacer />
        <StartAndStopSpace />
        <Spacer />
        <FilterOpacity />
        <Spacer />
        <Text on="white" size="s">
          Filter Library
        </Text>
        <Spacer height=".25rem" />
        <FilterTemplates />
      </div>
    </div>
  )
}
