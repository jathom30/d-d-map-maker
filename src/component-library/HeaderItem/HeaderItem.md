# Header Item Component

Header item component is used generally as a navigation button within the Header or specific header components.

### Props

- `to: string`
- `onClick: () => void`
- `children?: ReactNode`
- `icon?: JSX.Element`

---

## Uses

Header item is used as a specific element or 'item' on a header. These are used to interact with the app through an onClick or to navigate to a place using native **to** routing

## Notes

You should not use onClick and to in the same HeaderItem. Each Header Item should have a specific goal.

```tsx
<HeaderDropdown name="My Campaigns">
  <HeaderItem to="/campaign-dashboard">Campaign Dashboard</HeaderItem>
  <HeaderItem to="/campaigns">Campaigns</HeaderItem>
  <HeaderItem to="/saved-audiences">Saved Audience</HeaderItem>
  <HeaderItem to="/create-campaign/setup">
    <FontAwesomeIcon icon={faPlus} /> New Campaign
  </HeaderItem>
</HeaderDropdown>
```
