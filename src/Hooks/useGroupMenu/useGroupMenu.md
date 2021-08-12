# useGroupMenu

A custom hook to accompany the `SideMenuGroup` component.

---

## Props

- `routes?: <T extends { to: string }>[]`
- `defaultOpen?: boolean` <- defaults to true

## Return

- `[isOpen: boolean, handleClick: () => void, collapsedRoute: T]`

---

## Example

```tsx
const MySideMenu = () => {
  // pathname is used later to find if user is on current route
  const { pathname } = useLocation() 
  // myRoutes can be any array of objects as long as each object contains a `to` key
  // the `false` param being passed into useGroupMenu will have the group load closed as opposed to its default open
  const [isOpen, handleGroupClick, collapsedRoute] = useGroupMenu(myRoutes, false)

  return (
    <SideMenu>
      <SideMenuHeader title="Main section" />
      <Spacer />
      <SideMenuGroup
        isOpen={isOpen}
        onClick={handleGroupClick}
        icon={<MyIcon />}
        label={
          <SideMenuCollapseLabel
            label="Routes"
            isOpen={isOpen}
          />
        }
      >
        {myRoutes.map((route) => (
          <SideMenuItem
            to={route.to}
            icon={route.icon}
            label={route.label}
            childDepth={1}
            isActive={pathname === route.to}
          />
        ))}
      </SideMenuGroup>
      {collapsedRoute && (
        <SideMenuItem
          to={collapsedRoute.to}
          icon={collapsedRoute.icon}
          label={collapsedRoute.label}
          childDepth={1}
          isActive={pathname === collapsedRoute.to}
        />
      )}
    </SideMenu>
  )
}
```