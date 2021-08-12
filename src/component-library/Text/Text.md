# Text Component

The Text component is a custom uniform styled text wrapper.

---

### Types

```tsx
export interface CommonPropsType {
  UNSAFE_style?: CSSProperties
  UNSAFE_className?: string
}

interface CommonTextProps {
  // on: string (see union types far below)
  // kind?: string (see union types far below)
  // UNSAFE?: boolean (see union types far below)
  children?: ReactNode
  size?: 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'
  tag?: 'p' | 'span' | 'div'
  weight?: 'normal' | 'bold' | 'light'
  textAlign?: CSS.StandardLonghandProperties['textAlign']
  textTransform?: CSS.StandardLonghandProperties['textTransform']
  noWrap?: boolean
  truncate?: boolean
}

TextTypesUnionType found in `./components/src/components/Text/TextPropsType.ts`
```

---

### Props

- `on: string`
- `kind: string`
- `UNSAFE?: boolean`
- `children?: ReactNode`
- `size?: 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'`
- `tag?: 'p' | 'span' | 'div'`
- `weight?: 'normal' | 'bold' | 'light'`
- `textAlign?: CSS.StandardLonghandProperties['textAlign']`
- `textTransform?: CSS.StandardLonghandProperties['textTransform']`
- `noWrap?: boolean`
- `UNSAFE_style?: CSSProperties`
- `UNSAFE_classname?: string`
- `truncate?: boolean`

## Uses

Text is used for a simple use of text with levels of customization in which the component can assist you in styling.

Example:

```tsx
<Text on="white" size="xl" weight="bold" tag="div">
  {body}
</Text>
```
