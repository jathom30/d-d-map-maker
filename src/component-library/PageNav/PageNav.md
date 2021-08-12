# Page Nav Component

This is a component that allows navigation to routes with a sidebar. It provides the routes to the browser while **MenuPageRoutes** component is used in tandem most of the time to consume these pages and display the content in the **main** area.

### Types

```tsx
export type PagesType = {
  path: string
  exactPath?: boolean
  title: string
  component: () => ReactElement
}
```

### Props

- `pages?: PagesType[]`

---

## Uses

Used to create a navigation bar associated with the page. The bar will persist through the navigations to allow silky smooth transitions.

```tsx

const profilePages = [
{
    path: '/profile/',
    title: 'General Info',
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
    <PageNav pages={profilePages} />
  </nav>

  <main className="MyProfilePage__main">
    <MenuPageRoutes pages={profilePages} />
  </main>
</BrowserRouter>
```
