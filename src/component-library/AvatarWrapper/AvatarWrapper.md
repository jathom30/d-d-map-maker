# Avatar Component

The AvatarWrapper component is a wrapper used by the Avatar component to provide onClick functionality and an overlay.

---

## Ins and Outs

### Props

- `children: ReactNode`
- `onClick?: () => void`
- `hoverOverlay?: JSX.Element`

---

## Uses

Use to provide a button wrapper and overlay styles to an Avatar.

```tsx
<AvatarWrapper onClick={onClick} hoverOverlay={hoverOverlay}>
  <div>Avatar content</div>
</AvatarWrapper>
```
