# FormItem

A component used to wrap and inform inputs inside a form tag. Used best within the Form component.

---

## Ins and Outs

### Props

- `htmlFor: string` <- follows best practices and adds an id to the input for better UX.
- `label?: string`
- `required?: boolean`
- `errorMessage?: string`
- `valid?: boolean`

---

## Uses

The FormItem wraps and styles an input tag to apply additional functionality. If additionally wrapped inside the Form component, props like `required` will be handled by the Form component. For more information on the Form component, check its docs.

Example:
```tsx
<FormItem
  // htmlFor must match a key in the form data
  htmlFor="myValue"
  label="My Value"
  errorMessage="Please enter a valid value"
  valid={myvalue.length >= 5}
>
  <input value={myValue} onChange={e => setMyValue(e.target.value)} />
</FormItem>
```