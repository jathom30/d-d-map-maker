# Large Icon Button Component

Component that adds a uniform button across the application to insure same style and spacing.

### Props

- `title: string`
- `subtitle?: string`
- `disabled?: boolean`
- `icon?: JSX.Element`
- `rightText?: string | JSX.Element`
- `onClick?: () => void`
- `to?: string`

---

## Uses

This is an advanced button component. The uses are similar to a button however it gives a more plug and play opportunity by simply describing the text and icons you want to be placed inside the button without having to style yourself. There is also an **onClick** and **to** option but these should be used separately.

```tsx
<LargeIconButton
  title="Area Search"
  subTitle="View all houses for sale and the prospects seen in them."
  to={`${url}/area-search`}
  // icon={<FontAwesomeIcon icon={faLock} />}
/>
```
