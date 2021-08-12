# Loading Bar

A div to show loading progress.

---

## Props

- percentage?: `number`
- colorKind?: `'primary' | 'secondary' | 'tertiary' | 'grey' | 'success' | 'warning' | 'danger'`

---

## Examples

Below defaults to alternating loading animation and grey colors:
```jxs
  <LoadingBar />
```

With a set percentage:
```jsx
  const currentPercentage = getPercentage()

  return (
    <LoadingBar percentage={currentPercentage} />
  )
```

With color set:
```jsx
  <LoadingBar colorKind="tertiary" />
```
