# TableHeader Component

The TableHeader component is a styled html table label.

---

### Props<T>

- `columns: TableColumnType<T>[]`: Columns to be displayed
- `stickyHeader?: boolean`: Sets the label to stay in place when scrolling the table
- `ExpandableRow?: boolean`: If there is an expandable row component
- `handleSelectAll?: () => void`: Function to be called when the user checks the label checkbox
- `selectedAll?: boolean`: Header checkbox's checked status

#### TableColumnType<T>

- `label: string | ReactElement`: Header display name, if not provided, the path variable name will be used
- `path: string | string[]`: The key to access within data object
  - **Note** This can be an array of keys to navigate the data object, etc: `['first', 'second']` will look for `row.first.second`
- `RowCell?: (row: T) => ReactNode`: Overrides the row cell row[path]
- `alignment?: 'right' | 'center' | 'left'`: The alignment for the cells in this column
- `onSort?: (path: string | string[], sort?: 'asc' | 'desc') => void`: Function called when the user clicks the label
- `width? string`: Allows overriding the column width
  - **Note** This is a string that is either a percentage or pixel width. Example: '50%' or '120px'

---

## Uses

The TableHeader component can display all appropriate columns and supply a checkbox for selecting all items in the table.

***Note:** See Table.md for `columns` example

Example:

```tsx
<TableHeader
  columns={columns}
  stickyHeader={true}
  ExpandableRow={true}
  handleSelectAll={() => console.log('Selecting all rows')}
  selectedAll={false}
/>
```