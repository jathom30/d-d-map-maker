import React, { Fragment, useState, ReactNode } from 'react'
import './Breadcrumbs.scss'
import { Link, useLocation } from 'react-router-dom'
import { getColors } from '../../Helpers'
import { ColorTokensWithLighterAndDarkerType } from '../Text'

type BreadcrumbType = {
  path: string
  name?: ReactNode
}

const Breadcrumb: React.FC<{
  breadcrumb: BreadcrumbType
  on?: ColorTokensWithLighterAndDarkerType
  kind?: 'primary' | 'secondary' | 'tertiary'
  isActive: boolean
}> = ({ breadcrumb, on, kind, isActive }) => {
  const [hovering, setHovering] = useState(false)
  const style = () => {
    if (!on) return {}
    const { colors, hovered } = getColors(on, kind)
    return { color: hovering ? hovered.color : colors.color }
  }
  if (isActive) {
    return (
      <div style={style()} className="Breadcrumb Breadcrumb--is-active">
        {breadcrumb.name}
      </div>
    )
  }
  return (
    <Link
      style={style()}
      to={breadcrumb.path}
      className="Breadcrumb Breadcrumb--link"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {breadcrumb.name}
    </Link>
  )
}

export const Breadcrumbs = ({
  breadcrumbs,
  separator,
  on,
  kind,
}: {
  breadcrumbs: BreadcrumbType[]
  separator?: string | JSX.Element
  on?: ColorTokensWithLighterAndDarkerType
  kind?: 'primary' | 'secondary' | 'tertiary'
}) => {
  const location = useLocation()
  const isExactLocation = (path: string) =>
    location.pathname + location.search === path
  return (
    <div className="Breadcrumbs">
      {breadcrumbs.map(
        (breadcrumb) =>
          (location.pathname + location.search).includes(breadcrumb.path) && (
            <Fragment key={breadcrumb.path}>
              <Breadcrumb
                breadcrumb={breadcrumb}
                on={on}
                kind={kind}
                isActive={isExactLocation(breadcrumb.path)}
              />
              {!(location.pathname + location.search === breadcrumb.path) && (
                <div className="Breadcrumbs__separator">{separator || '>'}</div>
              )}
            </Fragment>
          ),
      )}
    </div>
  )
}
