# Radio Button Component

Radio button is used for a single selection array of buttons. Cannot have more than 1 option selected at a time.

### Props

- `checked?: boolean`
- `value: string | number`
- `onChange?: (newSelection: string | number, name: string, event: ChangeEvent<HTMLInputElement>) => void`
- `label?: ReactNode`
- `id?: string`
- `name?: string`
- `size?: 's' | 'm' | 'l' | 'xl'`

---

## Uses

Radio buttons are unique because they are a simple on or off selection. This component is used with RadioButtonGroup to select the RadioButton Properly.

```tsx
const [testValue, setTestValue] = useState<string | number | null>('')
<RadioButtonGroup
    name="group"
    valueSelected={testValue}
    onChange={(value) => setTestValue(value)}
>
    <RadioButton key={1} value="agency" label="Real Estate Agency" />
    <RadioButton key={2} value="self" label="Self Represented" />
</RadioButtonGroup>
```
