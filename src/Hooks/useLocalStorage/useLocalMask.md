# useLocalMask

Combines useLocalStorage and useMask to save a masked input to local storage so that it will persist upon browser refresh/reload

---

## A SPECIAL NOTE

For the safety of our user and, ultimately, the company, never use this hook to save the user's personal information such as credit card numbers, passwords, etc

---

## Ins and Outs

### Inputs

- `localMask: {initialState: string, mask: MaskType}`
- `key: string`

### Returns

- `maskedText: string`
- `setMaskedText: (value: string) => void`

---

## Uses

useLocalMask should be used if some user inputted data is safe to be saved to the browser and needs to be masked. 

```tsx
const [blogTitle, setBlogTitle] = useLocalMask({
  initialState: '',
  mask: myBlogMaskFunc,
}, 'blog-title-key')
```