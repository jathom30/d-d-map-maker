# TagInput Component

The TagInput component is an input that lists an array of tags for the user to visualize as they add or remove them.

---

## Ins and Outs

### Props

- `id?: string`: An id that is applied to the internal input
- `onChange: (tags: string[]) => void`: An onChange that recieves the current array of tags

---

## Uses

TagInput can be used by itself or within forms to collect an array of tags.

```tsx
const [tags, setTags] = useState<string[]>([])

<TagInput onChange={(tagArray) => setTags(tagArray)} />
```
