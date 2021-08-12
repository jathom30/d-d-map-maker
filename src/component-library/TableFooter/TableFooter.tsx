import React, { ReactNode } from 'react'
import './TableFooter.scss'

type TableFooterType = {
  children?: ReactNode
  colSpan?: number
}

export const TableFooter: React.FC<TableFooterType> = ({
  children,
  colSpan,
}) => {
  if (children) {
    return (
      <tfoot className="TableFooter">
        <tr>
          <td colSpan={colSpan}>{children}</td>
        </tr>
      </tfoot>
    )
  }

  return null
}
