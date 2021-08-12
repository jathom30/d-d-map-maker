import React, { useState, useRef, useEffect, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from '../Checkbox'
import { TableColumnType } from '../Table'
import { TableCell } from '../TableCell'
import './TableRow.scss'

type TableRowType<T> = {
  row: T
  columns: TableColumnType<T>[]
  altBg?: boolean
  ExpandableRow?: (row: T) => ReactNode
  onClick?: (clicked: T) => void
  selected?: boolean
  handleSelectRow?: (row: T, checked: boolean) => void
  getColspan: () => number
  striped?: boolean
}

export const TableRow = <T extends { [key: string]: any }>({
  row,
  columns,
  altBg,
  ExpandableRow,
  onClick,
  selected,
  handleSelectRow,
  getColspan,
  striped,
}: TableRowType<T>) => {
  const [expanded, setExpanded] = useState(false)
  const [rowWidth, setRowWidth] = useState<number>()

  const colWidth = rowWidth ? `${rowWidth / columns.length}px` : undefined

  const _handleExpand = () => {
    if (ExpandableRow) {
      setExpanded(!expanded)
    }
  }

  const widthRef = useRef<HTMLTableRowElement>(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setRowWidth(widthRef.current?.offsetWidth)
    })
    if (widthRef.current) {
      resizeObserver.observe(widthRef.current)
    }
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <>
      <tr
        onClick={() => onClick && onClick(row)}
        className={`TableRow${altBg ? ' TableRow--alternate' : ''}${
          selected ? ' TableRow--selected' : ''
        } ${onClick ? 'TableRow--has-on-click' : ''}`}
        ref={widthRef}
      >
        {handleSelectRow && (
          <td className="TableRow__checkbox">
            <Checkbox
              checked={selected || false}
              onChange={(checked) => handleSelectRow(row, checked)}
            />
          </td>
        )}
        {ExpandableRow && (
          <td className="TableRow__expand">
            <button
              className="TableRow__caret"
              type="button"
              onClick={() => _handleExpand()}
            >
              <FontAwesomeIcon icon={expanded ? faAngleDown : faAngleRight} />
            </button>
          </td>
        )}
        {columns.map((col, index) => {
          return (
            <TableCell
              key={JSON.stringify(row) + index}
              column={col}
              row={row}
              colWidth={colWidth}
            />
          )
        })}
      </tr>
      {expanded ? (
        <tr className="TableRow__expansion">
          <td colSpan={getColspan()} className="TableExpandedRow__column">
            {ExpandableRow && ExpandableRow(row)}
          </td>
        </tr>
      ) : (
        !striped && <tr className="TableRow__spacer" />
      )}
    </>
  )
}
