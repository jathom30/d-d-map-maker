# Toggle

A restyled checkbox input. Good for when an update will show an immediate change to the user.

---

## Props

- isDisabled?: `boolean`
- isChecked?: `boolean`
- onChange: `(checked: boolean) => void`
- size?: `'s' | 'm' | 'l' | 'xl'`

## Example

```jxs
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Toggle
      size="s"
      isChecked={isChecked}
      onChange={(newChecked) => setIsChecked(newChecked)}
    />
  )
```