import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button'
import { Text } from '../Text'
import { Spacer } from '../Spacer'
import './Pagination.scss'

type PaginationType = {
  onChange?: ({ page, pageSize }: { page: number; pageSize: number }) => void
  page: number
  pageSize: number
  totalItems: number
  children?: ReactNode
}

export const Pagination: React.FunctionComponent<PaginationType> = ({
  page,
  pageSize,
  totalItems,
  onChange,
  children,
}) => {
  const isLastPage = () => pageSize * page >= totalItems

  const itemRangeStart = page * pageSize - pageSize + 1

  const itemRangeEnd = isLastPage() ? totalItems : page * pageSize

  const handleChangePage = (newPage: number) => {
    if (onChange) onChange({ page: newPage, pageSize })
  }

  return (
    <div className="Pagination">
      {children || null}
      <Button
        onClick={() => handleChangePage(page - 1)}
        iconLeft={<FontAwesomeIcon icon={faCaretLeft} />}
        disabled={page < 2}
      />
      <Spacer />
      <Text on="grey-050" kind="subdued">
        {`${itemRangeStart} - ${itemRangeEnd} of ${totalItems}`}
      </Text>
      <Spacer />
      <Button
        onClick={() => handleChangePage(page + 1)}
        iconLeft={<FontAwesomeIcon icon={faCaretRight} />}
        disabled={isLastPage()}
      />
    </div>
  )
}
