# Header Dropdown Component

Header dropdown provides a uniform way of using a dropdown with the header component.

### Props

- `children: ReactNode`
- `position?: 'left' | 'right'`
- `hasDropdownIcon?: boolean` <- Defaults to true
- `name: string`
- `icon?: JSX.Element`

---

## Uses

Header dropdown is used with **HeaderItems** to provide a dropdown with an icon or name used to open and shut the dropdown.

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
