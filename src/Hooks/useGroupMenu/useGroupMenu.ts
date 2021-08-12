import { useCallback, useEffect, useState } from 'react'

export const useGroupMenu = <T extends { to: string }>({
  pathname,
  routes,
  defaultOpen = true,
  exactRoute = true,
}: {
  pathname: string
  routes?: T[]
  defaultOpen?: boolean
  exactRoute?: boolean
}): [boolean, () => void, T | undefined] => {
  const [isOpen, setIsOpen] = useState(!!defaultOpen)
  const [collapsedRoute, setCollapsedRoute] = useState<T>()

  const routeTest = useCallback(
    (route?: T) => {
      if (!route) return false
      if (exactRoute) {
        return route.to === pathname
      }
      return pathname.includes(route.to)
    },
    [exactRoute, pathname],
  )

  const handleClick = () => {
    const inMenu = routes?.some((route) => route.to === pathname)
    const filteredRoute = routes?.filter((route) => routeTest(route))
    const [newRoute] = Array.isArray(filteredRoute) ? filteredRoute : []
    setIsOpen((prevMenu) => {
      if (prevMenu) {
        setCollapsedRoute(inMenu ? newRoute : undefined)
      } else {
        setCollapsedRoute(undefined)
      }
      return !prevMenu
    })
  }

  useEffect(() => {
    const inMenu = routeTest(collapsedRoute)
    if (!isOpen && !inMenu) {
      setCollapsedRoute(undefined)
    }
  }, [pathname, collapsedRoute, isOpen, routeTest])
  return [isOpen, handleClick, collapsedRoute]
}
