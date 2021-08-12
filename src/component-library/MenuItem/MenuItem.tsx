import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Expand } from 'Types'
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { MenuItemRenderPropsType } from '../types'
import { Spacer } from '../Spacer'
import './MenuItem.scss'

export const MenuItem = ({
  title,
  id,
  icon,
  isActive,
  isOpen,
  hasSubmenu,
  alwaysOpen,
  onClick,
  addExpandedItem,
  removeExpandedItem,
}: Expand<MenuItemRenderPropsType>) => {
  return (
    <li className="MenuItem">
      <div
        role="button"
        className={classNames('Menu__nav-link', {
          active: isActive,
        })}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onClick}
      >
        <div className="Menu__nav-link--left">
          {icon}
          {icon ? <Spacer width=".25rem" /> : null}
          {title}
        </div>
        {hasSubmenu && !alwaysOpen && (
          <div
            role="button"
            className="Menu__nav-link--arrow"
            tabIndex={0}
            data-testid="arrow-click"
            onClick={(e) => {
              e.stopPropagation()
              if (isOpen) {
                removeExpandedItem(id)
              } else {
                addExpandedItem(id)
              }
            }}
            onKeyDown={(e) => {
              e.stopPropagation()
              if (isOpen) {
                removeExpandedItem(id)
              } else {
                addExpandedItem(id)
              }
            }}
          >
            {alwaysOpen ? null : (
              <FontAwesomeIcon icon={isOpen ? faArrowDown : faArrowRight} />
            )}
          </div>
        )}
      </div>
    </li>
  )
}
