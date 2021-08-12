# Modal Component

The Modal component provides an off click overlay behind the modal.

---

## Ins and Outs

### Props

- `offClick?: () => void`
- `noBackground?: boolean`
- `className?: string`
- `style?: CSSProperties`
- `header?: ReactNode`
- `positionFromTop?: StandardLonghandProperties['marginTop']`

---

## Uses

The Modal component has a blank slate for creating a modal. If a header is provided, it will appear as a modal title along with a close button.

```tsx
{
  open && <Modal offClick={() => setOpen(false)}>Modal contents here</Modal>
}
```