# Menu Component

This is a component that allows navigation to routes with a sidebar. It provides the routes to the browser while **MenuPageRoutes** component is used in tandem to identify the routes and place the appropriate component in the section it lives in, usually a main page pattern.

### Types

```tsx
export type MenuItemType = {
  title: string
  id: string
  icon?: ReactElement
  onClick?: () => void
  subMenuItem?: MenuItemType[]
  component: () => ReactElement
  exactPath?: boolean
}
```

### Props

- `menuNavigation: MenuItemType[]`

---

## Uses

Used to create a menu sidebar that navigates routes while being persisting through pages.

## Notes

Currently it is only able to handle a single subcategory and cannot be nested any further than one layer deep.
Not sure if this will be something we want to change in the future but there are plans for custom sections 
and deeper functionality.

```tsx

const profilePages = [
{
    id: '/profile/',
    title: 'General Info',
    icon: <FontAwesomeIcon icon={faAcorn}>,
    exactPath: true,
    component: () => (
    <TabWrapper>
        {user && (
        <>
            <PersonalInfoSection user={user} />
            <RealEstateInfoSection user={fixtureUsers[1]} />
        </>
        )}
    </TabWrapper>
    ),
    subMenuItem: [{
      id: '/profile/new_page',
      title: 'New Page',
      icon: <FontAwesomeIcon icon={faChair}>,
      exactPath: true,
      component: () => (
        <MyNewPage>
      }]
},
{
    path: '/profile/billing',
    title: 'Billing',
    exactPath: false,
    component: () => (
    <TabWrapper>
        <SubscriptionSection />
        <BillingSection profiles={fixturePaymentProfiles} />
    </TabWrapper>
    ),
},
]

<BrowserRouter>
  <nav className="MyProfilePage__nav">
    <h1 className="MyProfilePage__header">Account Settings</h1>
    <Menu pages={profilePages} />
  </nav>

  <main className="MyProfilePage__main">
    <MenuPageRoutes pages={profilePages} />
  </main>
</BrowserRouter>
```
