# Header Component

This is a very simple component to provide a header to a page. Works with other components within the library such as

- `HeaderLogo`
- `HeaderNav`
- `HeaderDropdown`
- `HeaderItem`

### Props

- `justifyContent?: StandardLonghandProperties['justifyContent']`
- `children: ReactNode`

---

## Uses

Header is a wrapper component to provide a app wide style on how headers are set up.

```tsx
<Header>
  <HeaderLogo logo={logo} to="/" />
  <HeaderNav>
    <HeaderItem to="/prospectActivity">Prospect Activity</HeaderItem>
    <HeaderDropdown name="My Campaigns">
      <HeaderItem to="/campaign1">Dashboard</HeaderItem>
      <HeaderItem to="/bettercampaign">Campaigns</HeaderItem>
      <HeaderItem to="/bestcampaign">Saved Audience</HeaderItem>
    </HeaderDropdown>
    <HeaderItem to="/contacts">My Contacts</HeaderItem>
    <HeaderItem to="/listings">My Listings</HeaderItem>
  </HeaderNav>
</Header>
```
