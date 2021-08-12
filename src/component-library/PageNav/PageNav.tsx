import React, { ReactElement } from 'react'
import './PageNav.scss'
import { NavLink } from 'react-router-dom'

export type PagesType = {
  id: string
  exactPath?: boolean
  title: string
  component: () => ReactElement
  subpages?: PagesType[]
}

export const PageNav = ({ pages }: { pages: PagesType[] }) => (
  <nav className="PageNav">
    {pages.map((page) => (
      <NavLink
        key={page.id}
        className="PageNav__nav-link"
        activeClassName="PageNav__nav-link--active"
        to={page.id}
        exact={page.exactPath}
      >
        {page.title}
      </NavLink>
    ))}
  </nav>
)
