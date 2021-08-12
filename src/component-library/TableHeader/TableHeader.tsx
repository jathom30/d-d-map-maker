import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { TableColumnType } from '../Table'
import { Checkbox } from '../Checkbox'
import './TableHeader.scss'

type TableHeaderType<T> = {
  columns: TableColumnType<T>[]
  stickyHeader?: boolean
  ExpandableRow?: boolean
  handleSelectAll?: () => void
  selectedAll?: boolean
}

export const TableHeader = <T extends { [key: string]: any }>({
  columns,
  stickyHeader,
  ExpandableRow,
  handleSelectAll,
  selectedAll,
}: TableHeaderType<T>) => {
  const [sorted, setSorted] = useState<[number, 'asc' | 'desc'] | undefined>(
    undefined,
  )

  const handleSort = (columnIndex: number, sortFunc: Function | undefined) => {
    const newSort = sorted && sorted[1] === 'asc' ? 'desc' : 'asc'
    if (sorted && sorted[0] === columnIndex) {
      setSorted([columnIndex, newSort])
    } else setSorted([columnIndex, 'asc'])
    if (sortFunc) sortFunc(columns[columnIndex].path, newSort)
  }

  const getHeaderText = (col: TableColumnType<T>) => {
    if (col.label) return col.label
    if (typeof col.path === 'string') return col.path
    if (Array.isArray(col.path)) return col.path[col.path.length - 1]
    return ''
  }

  return (
    <thead className="TableHeader">
      <tr className="TableHeader__row">
        {handleSelectAll && (
          <th
            className={classNames(
              'TableHeader__cell TableHeader__cell--checkbox',
              {
                'TableHeader__cell--sticky': stickyHeader,
              },
            )}
          >
            <Checkbox
              checked={selectedAll || false}
              onChange={() => handleSelectAll()}
              label=""
            />
          </th>
        )}
        {ExpandableRow && <td className="TableHeader__expand" />}
        {columns.map((col, index) => {
          const { onSort } = col

          return (
            <th
              key={index}
              onClick={() => handleSort(index, onSort)}
              className={classNames(
                'TableHeader__cell',
                {
                  'TableHeader__cell--sticky': stickyHeader,
                },
                { 'TableHeader__cell--sort': onSort },
              )}
              style={col.width ? { width: col.width } : {}}
            >
              <div
                className={`TableHeader__label-container ${
                  col.alignment && !onSort
                    ? `TableHeader__label-container--${col.alignment}`
                    : ''
                }`}
              >
                {getHeaderText(col)}
                {onSort &&
                  (sorted && sorted[0] === index && sorted[1] === 'asc' ? (
                    <FontAwesomeIcon icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                  ))}
              </div>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
