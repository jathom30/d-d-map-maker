---
name: usePagination
menu: Hooks
---

# usePagination

A hook for managing pagination state including page size, total pages, and page navigation.

---

## Ins and Outs

### Inputs

- `pageSize: number`
  - **Required**
  - The number of items or rows per page to display
- `fetchData: ({ page, pageSize }: { page: number; pageSize: number }) => Promise<{ data: any[]; totalItems: number }>`
  - **Required if `sourceData` is not set**
  - A promise function to fetch your data on page change
  - Recieves page and pageSize for calculating offset or limit however the fetch needs to use items
  - Needs to return data (results) from fetch and the totalItems available
- `sourceData: any[]`
  - **Required if `fetchData` is not set**
  - An array of data to be paginated for display client-side

### Return

- `page: number`
  - The current page
- `pageSize: number`
  - The number of items or rows per page`
- `totalItems: number`
  - The total of items available overall
- `totalPages: number`
  - The total number of pages available, calculated from `Math.ceil(totalItems / pageSize)`
- `setPage: (page: number) => void`
  - Sets the page number to the specified number
- `setPageSize: (page: number) => void`
  - Sets the number of items per page to the specified number
- `loading: boolean`
  - Used internally when fetching data, but available for UI use
- `data: Array<any>`
  - The data that is displayed on the current page

---

## Uses

usePagination can be used to create custom pagination components, or used with the Pagination component in `components`

Example with fetch:

```tsx
const fetchFromApi = async ({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) => {
  const limit = pageSize
  const offset = pageSize * (page - 1)

  return fetch(`https://exampleapi.com?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    .then((data) => {
      return { data, totalItems: data.count }
    })
}

const {
  page,
  pageSize,
  totalItems,
  totalPages,
  setPage,
  setPageSize,
  loading,
  data,
} = usePagination({
  pageSize: 20,
  fetchData: fetchFromApi,
})
```

Example with array of data:

```tsx
const staticData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const paginationProps = usePagination({
  pageSize: 2,
  sourceData: staticData,
})
const {
  page,
  pageSize,
  totalItems,
  totalPages,
  setPage,
  setPageSize,
  loading,
  data,
} = paginationProps
```

Example with `components` Pagination component:

```tsx
const staticData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const paginationProps = usePagination({
  pageSize: 2,
  sourceData: staticData,
})
const { page, setPage, data } = paginationProps

<Pagination
  {...paginationProps}
  onChange={(pageInfo) => {
    setPage(pageInfo.page)
  }}
/>
```
