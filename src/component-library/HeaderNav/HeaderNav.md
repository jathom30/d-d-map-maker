# Header Nav Component

HeaderNav component is a simple wrapper for content inside the header. It simply provides margins to left and right if needed.

### Props

- `children: ReactNode`
- `marginRight?: string`
- `marginLeft?: string`

---

## Uses

Header nav is used to wrap header items and content inside the header.

```tsx
<HeaderNav marginLeft="2rem" marginRight="2rem">
  <HeaderItem to="/prospects">Prospect Activity</HeaderItem>
  <HeaderDropdown name="My Campaigns">
    <HeaderItem to="/campaign-dashboard">Campaign Dashboard</HeaderItem>
    <HeaderItem to="/campaigns">Campaigns</HeaderItem>
    <HeaderItem to="/saved-audiences">Saved Audience</HeaderItem>
    <HeaderItem to="/create-campaign/setup">
      <FontAwesomeIcon icon={faPlus} /> New Campaign
    </HeaderItem>
  </HeaderDropdown>
  <HeaderItem to="/contacts">My Contacts</HeaderItem>
  <HeaderItem to="/listings">My Listings</HeaderItem>
</HeaderNav>
```
