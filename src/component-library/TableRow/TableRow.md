# TableRow Component

The TableRow component is a styled html table row that accomodates selection and expandable rows.

---

### Props<T>

- `row: T`: The row data to be displayed
- `columns: TableColumnType<T>[]`: The table columns
- `altBg?: boolean`: Sets the background to the alternate color
- `ExpandableRow?: (row: T) => ReactNode`: The content for this row's expansion
- `selected?: boolean`: If the row is selected or not
- `handleSelectRow?: (row: T, checked: boolean) => void`: Function to be called when the row is checked
- `getColspan: () => number`: Function to supply the appropriate colSpan for the rows
- `striped?: boolean`: If the table is stripe styled, striped tables do not have spacing between rows

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

The TableRow can be used within a `tbody`.

**Note:** See Table.md for `columns` example

Example:

```tsx
<tbody>
  {rows.map((row, index) => {
    const altBg = striped && index % 2 === 1 // Alternates row color
    return (
      <TableRow
        key={index}
        row={row}
        columns={columns}
        altBg={altBg}
        ExpandableRow={(row) => <div>{row.name}'s content</div>}
      />
    )
  })}
</tbody>
```
