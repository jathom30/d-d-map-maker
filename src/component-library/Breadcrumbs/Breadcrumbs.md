# Breadcrumbs Component

The Breadcrumbs component is a component to establish a breadcrumb routing system in which you can navigate to previous pages that you have navigated to previously.

---

## Ins and Outs

### Types

type BreadcrumbType = {
  path: string
  name?: string
}

### Props

- `breadcrumbs: BreadcrumbType[]`
- `separator?: string | JSX.Element`

---

## Uses

This component is used as a routing system for an application that will keep an idea of previous routes that have been visited and how to get there.

```tsx
      <Breadcrumbs
        breadcrumbs={[
          { path: '/dashboard', name: 'Dashboard' },
          { path: '/createcampaign', name: 'Create Campaign' },
        ]}
      />
```
