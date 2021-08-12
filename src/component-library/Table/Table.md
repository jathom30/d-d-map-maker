# Table Component

The Table component is a styled html table with functionality.

---

### Props<T>

- `rows: T[]`: The rows of data for table to display
- `columns: TableColumnType<T>[]`: The columns the table will display (see TableColumnType below)
- `ExpandableRow?: (row: T) => ReactNode`: Returns an element to be displayed within a row's expansion
- `onSelect?: (checked: T[]) => void`: Function to be called when a row is checked, recieves an array of currently checked items
- `stickyHeader?: boolean`: Sets the label to stay in place when scrolling the table
- `FooterContent?: ReactNode`: Supplies custom footer content
- `UNSAFE_style?: React.CSSProperties`: Apply custom styling to table
- `UNSAFE_className?: string`: Apply custom className to table
- `striped?: boolean`: Sets the table to have alternate colored rows for readability
- `fixedCellSize?: boolean`: Sets the table columns to have a fixed equal width

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

## Column configuration example

```tsx
import { Table, TableColumnType } from 'components'

const columns: TableColumnType[] = [
  // Column gets name of each row data and calls an onSort when column label is clicked
  {
    path: 'name',
    onSort: (path, sort) => console.log(path, sort),
  },
  // Header has different text than data accesssor
  // Has RowCell to override default cell display
  // Column cells are right-aligned
  {
    label: 'Status Report',
    path: 'status',
    RowCell: (row) => {
      return (
        <button type="submit" onClick={() => console.log(row.status)}>
          {row.status}
        </button>
      )
    },
    alignment: 'right',
  },
]
```

## Data example

```tsx
const data = [
  {
    name: 'Hannah',
    status: 'hungry',
  },
  {
    name: 'Joe',
    status: 'statiated',
  },
  {
    name: 'Marcello',
    status: 'kinda hungry',
  },
]
```

## Uses

The Table component can be used to display a set of data (objects with keys).

Example with alternating rows and a sticky label:

```tsx
<Table rows={data} columns={columns} striped stickyHeader />
```

Example with expandable rows:

```tsx
<Table
  rows={data}
  columns={columns}
  ExpandableRow={(row) => <div>Example expandable row component</div>}
/>
```

Example with checkbox selection:

```tsx
<Table
  rows={data}
  columns={columns}
  onSelect={(rows) => console.log(rows, 'selected rows')}
/>
```