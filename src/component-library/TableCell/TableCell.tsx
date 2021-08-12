import React, { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { TableColumnType } from '../Table'
import { FlexBox } from '../Box'
import './TableCell.scss'

type TableCellType<T> = {
  row: T
  column: TableColumnType<T>
  colWidth?: string
}

export const TableCell = <T extends { [key: string]: any }>({
  row,
  column,
  colWidth,
}: TableCellType<T>) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [rect, setRect] = useState<DOMRect>()

  const measuredWrapperRef = useCallback(
    (node: HTMLTableDataCellElement) => {
      if (node !== null) {
        setRect(node.getBoundingClientRect())
      }
    },
    [showTooltip],
  )

  const _convertObjArrayValue = (value: any) => {
    if (Array.isArray(value))
      // Filters out objects from array
      return value.filter((item) => typeof item !== 'object').join(', ')
    if (typeof value === 'object' && value !== null) {
      console.warn('TableRow: Column path should not return an object.')
      return ''
    }
    return value
  }

  const _handleRowData = (path: string | string[]) => {
    if (Array.isArray(path)) {
      let current = row
      for (let i = 0; i < path.length; i += 1) {
        if (current[path[i]] === undefined) {
          return undefined
        }
        current = current[path[i]]
      }
      return _convertObjArrayValue(current)
    }
    return _convertObjArrayValue(row[path])
  }

  const getFlexAlign = (alignment: 'left' | 'right' | 'center' | undefined) => {
    if (alignment === 'center') return 'center'
    if (alignment === 'right') return 'flex-end'
    return 'flex-start'
  }

  const key = column.path
  if (column.RowCell) {
    return (
      <td
        className={`TableCell${
          column.alignment ? ` TableCell--${column.alignment}` : ''
        }`}
      >
        <FlexBox justifyContent={getFlexAlign(column.alignment)}>
          {column.RowCell(row)}
        </FlexBox>
      </td>
    )
  }
  if (key) {
    return (
      <>
        <td
          className={`TableCell${
            column.alignment ? ` TableCell--${column.alignment}` : ''
          }`}
          style={
            colWidth
              ? {
                  maxWidth: colWidth,
                  whiteSpace: 'nowrap',
                  overflowX: 'hidden',
                  textOverflow: 'ellipsis',
                }
              : {}
          }
          ref={measuredWrapperRef}
          onMouseEnter={(e) => {
            const cell = e.target as HTMLTableDataCellElement
            if (cell.scrollWidth > cell.offsetWidth) {
              setShowTooltip(true)
            }
          }}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {_handleRowData(key)}
          {showTooltip &&
            createPortal(
              <div
                className="TableCell__text-overflow"
                style={{
                  top: rect ? rect.top : undefined,
                  left: rect ? rect.left : undefined,
                }}
              >
                {_handleRowData(key)}
              </div>,
              document.body,
            )}
        </td>
      </>
    )
  }
  return <td />
}
