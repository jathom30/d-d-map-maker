# Min Max Slider Component

Min max slider provides an easy, 2 bar slider with each representing either a minimum value or maximum value

### Props

- `minMax?: [number, number]`
- `range?: [number, number]`
- `step?: number`
- `onChange?: (newMinMax: [number, number]) => void`

---

## Uses

This is used to allow the user to describe a range of numbers. These numbers are typically used to filter data to specific specifications.

```tsx
const [start, setStart] = useRecoilState(filterStartSpaceAtom)
const [stop, setStop] = useRecoilState(filterStopSpaceAtom)

const handleStartStop = (startStop: [number, number]) => {
  setStart(startStop[0])
  setStop(startStop[1])
}
<MinMaxSliderOld
  minMax={[start, stop]}
  range={[0, 1]}
  step={0.05}
  onChange={handleStartStop}
/>

or

const [minMaxObj, setMinMaxObj] = useState<{ min: number; max: number }>()
<MinMaxSliderOld
    minMax={minMaxObj ? [minMaxObj.min, minMaxObj.max] : undefined}
    onChange={([min, max]) => setMinMaxObj({ min, max })}
/>
```
