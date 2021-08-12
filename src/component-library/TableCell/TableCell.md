# TableCell Component

The TableCell component is a styled html table cell that accomodates hover on overflow.

---

### Props<T>

- `row: T`: The current row this cell refers to
- `column: TableColumnType<T>`: The table column this cell refers to
- `colWidth: string`: The width of the cell

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

The TableCell is ideally used within a `TableRow`.

**\*Note:** See Table.md for `columns` example

Example:

```tsx
<tr>
  {columns.map((column) => (
    <TableCell row={row} column={column} colWidth="123px" />
  ))}
</tr>
```
