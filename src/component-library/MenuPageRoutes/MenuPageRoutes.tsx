import React from 'react'
import './MenuPageRoutes.scss'
import { Switch, Route } from 'react-router-dom'
import { MenuItemType } from '../types'

export const MenuPageRoutes = ({ pages }: { pages: MenuItemType[] }) => (
  <div className="MenuPageRoutes">
    <Switch>
      {pages.map((page, index) => (
        <Route
          key={index}
          exact={page.exactPath}
          path={page.id}
          component={page.component}
        />
      ))}
      {pages.map((page) =>
        page.subMenuItem?.map((subItem, index) => (
          <Route
            key={index}
            exact={subItem.exactPath}
            path={subItem.id}
            component={subItem.component}
          />
        )),
      )}
    </Switch>
  </div>
)
