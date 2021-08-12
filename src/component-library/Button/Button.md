# Button

A button component that can handle various styles.

---

## Ins and Outs

### Props

- `children?: string`
- `iconLeft?: JSX.Element`
- `iconRight?: JSX.Element`
- `rounded?: boolean`
- `type?: 'button' | 'submit'`
- `kind?: 'default' | 'primary' | 'danger' | 'text'`
- `size?: 's' | 'm' | 'l' | 'xl'`
- `width?: string`
- `disabled?: boolean`
- `onMouseOver?: (event?: React.MouseEvent) => void`
- `onMouseOut?: (event?: React.MouseEvent) => void`
- `UNSAFE_className?: string`
- `UNSAFE_style?: CSS.Properties`
- `onClick?: (event?: React.MouseEvent) => void`
- `to?: LinkProps['to']`
  - **Note:** `onClick` and `to` cannot be used together
- `buttonRef?: React.Ref<HTMLButtonElement> | React.MutableRefObject<HTMLButtonElement>`
- `linkRef?: React.Ref<HTMLAnchorElement> | React.MutableRefObject<HTMLAnchorElement>`
  - **Note:** `buttonRef` and `linkRef` cannot be used together

---

## Uses

Button component can be either a link-style or a button-style. Links can receive `to` and `linkRef` props, while buttons can receive `onClick` and `buttonRef` props.

Button example (with optional ref):

```tsx
const buttonRef = React.useRef<HTMLButtonElement | null>(null)
<Button onClick={() => console.log('clicked')} buttonRef={buttonRef}>Click me</Button>
```

Link example (with optional ref):

```tsx
const linkRef = React.useRef<HTMLAnchorElement | null>(null)
<Button to="/new-page" linkRef={linkRef}>Click me</Button>
```
