import React, { ReactNode } from 'react'
import { MaxHeightContainer } from '../MaxHeightContainer'
import { FlexBox } from '../Box'
import { Text } from '../Text'
import './Section.scss'

type SectionType = {
  title: string
  actions?: ReactNode
} & (
  | { dark?: boolean; noBackground?: never }
  | { dark?: never; noBackground?: boolean }
)

export const Section: React.FC<SectionType> = ({
  title,
  actions,
  dark = false,
  noBackground = false,
  children,
}) => {
  let className = 'Section'

  if (dark) {
    className += ' Section--dark'
  }
  if (noBackground) {
    className += ' Section--no-background'
  }
  return (
    <div className={className}>
      <MaxHeightContainer
        fullHeight
        header={
          <div className="Section__header">
            <FlexBox alignItems="center" justifyContent="space-between">
              <Text weight="bold" on="grey-100" size="xxl">
                {title}
              </Text>
              <div className="Section__actions">{actions}</div>
            </FlexBox>
          </div>
        }
      >
        <div className="Section__body">
          <div className="Section__spacer" />
          {children}
        </div>
      </MaxHeightContainer>
    </div>
  )
}
