import React, { ReactNode, useState, useEffect } from 'react'
import { TableFooter } from '../TableFooter'
import { TableRow } from '../TableRow'
import { TableHeader } from '../TableHeader'
import './Table.scss'

export type TableColumnType<T> = {
  RowCell?: (row: T) => ReactNode // Overrides the default row cell row[path] display
  alignment?: 'right' | 'center' | 'left' // The alignment for the cells in this column
  onSort?: (path: string, sort?: 'asc' | 'desc') => void // Called when the user clicks the label
  label?: string | React.ReactElement // Header label for column
  path: string | string[] // Object path for display value
  width?: string // Column width override
}

interface BasicTableType<T> {
  rows: T[]
  columns: TableColumnType<T>[]

  // Options
  stickyHeader?: boolean
  FooterContent?: ReactNode
  striped?: boolean
  fixedCellSize?: boolean
  UNSAFE_style?: React.CSSProperties
  UNSAFE_className?: string
}

interface HasOnSelectType<T> extends BasicTableType<T> {
  // For checkboxes
  onSelect: (checked: T[]) => void // Adds item to array, receives checked items
  // For dropdown
  ExpandableRow?: (row: T) => ReactNode
  onClick?: undefined
  clicked?: undefined
}

interface HasOnClickType<T> extends BasicTableType<T> {
  onClick: (clicked: T) => void
  clicked?: T
  // For dropdown
  ExpandableRow?: undefined
  onSelect?: undefined
}

interface HasNeitherType<T> extends BasicTableType<T> {
  onClick?: undefined
  onSelect?: undefined
  clicked?: undefined
  // For dropdown
  ExpandableRow?: (row: T) => ReactNode
}

export type TableType<T> =
  | HasOnClickType<T>
  | HasOnSelectType<T>
  | HasNeitherType<T>

export const Table = <T extends { [key: string]: any }>({
  rows,
  columns,
  stickyHeader,
  FooterContent,
  UNSAFE_style,
  UNSAFE_className,
  striped,
  fixedCellSize,
  ExpandableRow,
  onSelect,
  onClick,
  clicked,
}: TableType<T>) => {
  const [currentSelected, setCurrentSelected] = useState<number[]>([])

  const formatRows = () =>
    rows.map((row, index) => {
      return { tableRowId: index, ...row }
    })

  // Function for individual row selection
  const handleSelectRow = (row: T, checked: boolean) => {
    if (!checked) {
      setCurrentSelected((previous) =>
        previous.filter((rowId) => rowId !== row.tableRowId),
      )
    } else setCurrentSelected((previous) => [...previous, row.tableRowId])
  }

  // Function for TableHeader to call when 'select all' checkbox is checked
  const handleSelectAll = () => {
    if (currentSelected.length === rows.length) {
      setCurrentSelected([])
    } else {
      const allRowIds = []
      for (let i = 0; i <= rows.length - 1; i += 1) {
        allRowIds.push(i)
      }
      setCurrentSelected(allRowIds)
    }
  }

  // Determines colspan including all columns + checkboxes + expandable row icon
  const getColspan = () => {
    let num = columns.length
    if (ExpandableRow) num += 1
    if (onSelect) num += 1
    return num
  }

  // Calls onSelect function when currentSelected changes
  useEffect(() => {
    if (onSelect) {
      const selectedRows = formatRows().filter((row) =>
        currentSelected.includes(row.tableRowId),
      )
      onSelect(selectedRows)
    }
  }, [currentSelected])

  return (
    <div className="TableWrapper">
      <table
        className={`Table${UNSAFE_className || ''}`}
        style={{
          ...UNSAFE_style,
          tableLayout: fixedCellSize ? 'fixed' : 'auto',
        }}
      >
        <TableHeader
          columns={columns}
          stickyHeader={stickyHeader}
          ExpandableRow={!!ExpandableRow}
          handleSelectAll={onSelect && handleSelectAll}
          selectedAll={onSelect && currentSelected.length === rows.length}
        />
        <tbody className="Table__body">
          {stickyHeader && <tr className="TableRow__spacer" />}
          {formatRows().map((row, index) => {
            const altBg = striped && index % 2 === 1
            return (
              <TableRow
                key={index}
                row={row}
                columns={columns}
                altBg={altBg}
                striped={striped}
                ExpandableRow={ExpandableRow}
                onClick={onClick}
                selected={
                  (clicked && clicked.tableRowId === row.tableRowId) ||
                  (onSelect && currentSelected.includes(row.tableRowId))
                }
                handleSelectRow={onSelect && handleSelectRow}
                getColspan={getColspan}
              />
            )
          })}
        </tbody>
        {FooterContent && (
          <TableFooter colSpan={getColspan()}>{FooterContent}</TableFooter>
        )}
      </table>
    </div>
  )
}
