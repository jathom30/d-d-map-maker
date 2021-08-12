import { CSSProperties } from 'react'

export interface CommonPropsType {
  UNSAFE_style?: CSSProperties
  UNSAFE_className?: string
}

export type MenuItemType = {
  title: string
  id: string
  icon?: JSX.Element
  onClick?: (menuItemId: string) => void
  alwaysOpen?: boolean
  subMenuItem?: MenuItemType[]
  menuComponent?: (props: MenuItemRenderPropsType) => JSX.Element
  component: () => JSX.Element
  exactPath?: boolean
}

export type MenuItemRenderPropsType = {
  title: string
  id: string
  icon?: JSX.Element
  isActive?: boolean
  alwaysOpen?: boolean
  isOpen?: boolean
  hasSubmenu?: boolean
  onClick?: () => void
  addExpandedItem: (id: string) => void
  removeExpandedItem: (id: string) => void
}
