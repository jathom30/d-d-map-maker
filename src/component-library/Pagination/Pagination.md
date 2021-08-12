---
name: Pagination
menu: Components
---

# Pagination

A component for navigating between pages of items.

---

## Ins and Outs

### Inputs

- `page: number`
  - The current page
- `pageSize: number`
  - The number of items or rows per page`
- `totalItems: number`
  - The total of items available overall
- `onChange: ({ page, pageSize }: { page: number; pageSize: number }) => void`
  - **Optional**
  - Is called when moving forward or backward, returns page number and page size to caller
- `children: ReactNode`
  - **Optional**
  - Any React node that will be placed to the left of the pagination controls

---

## Uses

Pagination can be used to manage pagination for tables, galleries, etc. It was designed to be used with the usePagination hook in `Hooks`

Example:

```tsx
const [pg, setPg] = React.useState(1)
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

<Pagination
  page={page}
  pageSize={2}
  totalItems={data.length}
  onChange={({ page }) => {
    setPg(page)
  }}
/>
```
