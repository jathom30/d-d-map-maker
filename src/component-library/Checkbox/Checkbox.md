# Checkbox Component

This component is a simple checkmark component with built in filling depending on state.

### Props

- `checked: boolean`
- `onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void`
- `label?: ReactNode`
- `id?: string`
- `size?: 's' | 'm' | 'l' | 'xl'` <-- Defaults to medium sized

---

## Uses

This component is used as a simple plug-and-play checkbox component for your state controlling pleasure. Just pass in the state and the setState and you're good to go

```tsx
const [isChecked, setIsChecked] = useState<boolean>(false)

<Checkbox
  checked={isChecked}
  onChange={() => {
    setIsChecked(!isChecked)
  }}
  label="Remember Me"
/>
```
