# Collapsible Container Component

This provides a container for any content that you want that will dynamically close and open to the size of the content depending on if its open or not

### Props

- `isOpen: boolean`

---

## Uses

This component is very simple. It is a dumb component that will simply open to the size of the content or it will be set to 0 height.

```tsx
<CollapsibleContainer isOpen={open}>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, qui
    illo placeat cumque totam doloremque odio ea iure temporibus architecto.
    Magnam ut explicabo assumenda. Animi repellendus similique sapiente
    repudiandae quam!
  </p>
</CollapsibleContainer>
```
