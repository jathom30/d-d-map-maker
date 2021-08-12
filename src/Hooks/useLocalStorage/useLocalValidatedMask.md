# useLocalValidatedMask

Combines useLocalMask with useValidated to save a masked and validated input to local storage so that it persists upon browser refresh/reload

---

## A SPECIAL NOTE

For the safety of our user and, ultimately, the company, never use this hook to save the user's personal information such as credit card numbers, passwords, etc

---

## Ins and Outs

### Inputs


- `validatedMask: ValidatedMaskType` <- see useValidatedMask for examples of `ValidatedMaskType`
- `key: string`

### Returns

- `maskedValue: string`
- `setMaskedText: (value: string) => void`
- `valid: boolean`

---

## Uses

useLocalValidatedMask should be used if some user inputted data is safe to be saved to the browser and needs to be validated and masked. 

```tsx
const [blogTitle, setBlogTitle] = useLocalValidatedMask({
  initialState: '',
  mask: myBlogMaskFunc,
  validation: RegExp,
}, 'blog-title-key')
```