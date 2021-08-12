import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { Spacer } from '../Spacer'
import { MenuItemType } from '../types'
import './Menu.scss'
import { MenuItem } from '../MenuItem'

export const Menu = ({
  menuNavigation,
}: {
  menuNavigation: MenuItemType[]
}) => {
  const [currentIdsExpanded, setCurrentIdsExpanded] = useState([''])
  const history = useHistory()
  const currentRoute = useLocation().pathname

  const subMenuShowing = (menuItem: MenuItemType) => {
    return (
      currentIdsExpanded.some((id) => id === menuItem.id) || menuItem.alwaysOpen
    )
  }

  const addExpandedId = (menuItemId: string) => {
    setCurrentIdsExpanded((oldArray) => [...oldArray, menuItemId])
  }

  const removeExpandedId = (menuItemId: string) => {
    setCurrentIdsExpanded(
      currentIdsExpanded.filter((item) => item !== menuItemId),
    )
  }

  const mainMenuItemClick = (menuItem: MenuItemType) => {
    if (menuItem.id !== currentRoute) {
      history.push(menuItem.id)
    }
    menuItem.onClick?.(menuItem.id)
  }

  return (
    <nav className="Menu">
      {menuNavigation.map((menuItem, index) => {
        const menuItemProps = {
          title: menuItem.title,
          onClick: () => mainMenuItemClick(menuItem),
          icon: menuItem.icon,
          hasSubmenu: !!menuItem.subMenuItem && menuItem.subMenuItem.length > 0,
          isOpen: subMenuShowing(menuItem),
          isActive: menuItem.id === currentRoute,
          addExpandedItem: addExpandedId,
          removeExpandedItem: removeExpandedId,
          alwaysOpen: menuItem.alwaysOpen,
          id: menuItem.id,
        }
        return (
          <ul key={menuItem.id}>
            {menuItem.menuComponent
              ? menuItem.menuComponent(menuItemProps)
              : MenuItem(menuItemProps)}
            <ul>
              {subMenuShowing(menuItem) &&
                menuItem.subMenuItem?.map((subMenuItem, i) => {
                  return (
                    <li key={subMenuItem.id}>
                      <div
                        role="button"
                        className={classNames('Menu__nav-link-submenu', {
                          active: subMenuItem.id === currentRoute,
                        })}
                        tabIndex={i}
                        onClick={() => {
                          if (subMenuItem.id !== currentRoute) {
                            history.push(subMenuItem.id)
                          }
                        }}
                        onKeyDown={() => {
                          if (subMenuItem.id !== currentRoute) {
                            history.push(subMenuItem.id)
                          }
                        }}
                      >
                        {subMenuItem.icon}
                        <Spacer width=".25rem" />
                        {subMenuItem.title}
                      </div>
                    </li>
                  )
                })}
            </ul>
          </ul>
        )
      })}
    </nav>
  )
}
