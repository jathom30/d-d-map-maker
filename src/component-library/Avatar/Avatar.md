# Avatar Component

The Avatar component is a simple display of a user's avatar image or their initials.

---

## Ins and Outs

### Props

- `src?: string` <-- Required if no name provided
- `name?: string` <-- Required if no src provided
- `size?: 's' | 'm' | 'l' | 'xl'`
- `rounded?: boolean`
- `UNSAFE_className?: string`
- `onClick?: () => void`
- `hoverOverlay?: JSX.Element`

---

## Uses

Displays a rounded avatar with random background color and user's initials. If there is an onClick provided, the avatar will act as a button. If both `onClick` and `hoverOverlay` are provided, the avatar will dim on hover and display the overlay on top.

```tsx
<Avatar name="John Doe" rounded />
```

Displays an avatar with provided image source and a large size:

```tsx
<Avatar src="https://via.placeholder.com/150" size="l" />
```

If both `src` and `name` are provided, the avatar will show the image source:

```tsx
<Avatar src="https://via.placeholder.com/150" name="John Doe" />
```

With an onClick and hoverOverlay:

```tsx
<Avatar
  name="John Doe"
  rounded
  size="xl"
  onClick={() => console.log('clicked avatar')}
  hoverOverlay={<div>upload</div>}
/>
```
