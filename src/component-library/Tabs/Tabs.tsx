import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useKeyboardFocus } from 'Hooks'
import { getColors } from '../../Helpers'
import { ColorTokensWithLighterAndDarkerType } from '../Text'
import { Tab } from './Tab'
import './Tabs.scss'

export type TabType = {
  id: string
  label: ReactNode
  onClick?: () => void
  defaultTab?: boolean
  isDisabled?: boolean
  component?: ReactNode
}

export const Tabs: React.FC<{
  tabs: TabType[]
  on: ColorTokensWithLighterAndDarkerType
}> = ({ tabs, on }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [currentTab, setCurrentTab] = useState('')
  const [phantom, setPhantom] = useState({ left: 0, width: 0 })
  const tabsRef = useRef<HTMLUListElement>(null)
  const hasKeyboardFocus = useKeyboardFocus(tabsRef)
  const {
    colors: { color },
    hovered,
  } = getColors(on)

  useEffect(() => {
    const [activeTab] = tabs.filter((tab) => tab.defaultTab)
    if (activeTab) {
      setCurrentTab(activeTab?.id)
    } else {
      setCurrentTab(tabs[0].id)
    }
  }, [])

  const handleClick = (tabId: string, tabClick?: () => void) => {
    setCurrentTab(tabId)
    if (tabClick) tabClick()
  }

  // get new tab from keyboard input
  const getNewTab = (next: boolean, index: number): TabType => {
    const newIndex = index + (next ? 1 : -1)
    const newTabIndex = (i: number) => {
      if (next) {
        return i > tabs.length - 1 ? 0 : i
      }
      return i < 0 ? tabs.length - 1 : i
    }
    // if the new index is disabled, run func again with new index
    if (tabs[newTabIndex(newIndex)].isDisabled)
      return getNewTab(next, newTabIndex(newIndex))
    return tabs[newTabIndex(newIndex)]
  }
  // set new tab and trigger optional onClick from keyboard inputs
  const handleTabChange = (next: boolean) => {
    const indexOfCurrentTab = tabs.findIndex((tab) => tab.id === currentTab)
    const newTab = getNewTab(next, indexOfCurrentTab)
    setCurrentTab(newTab.id)
    if (newTab.onClick) newTab.onClick()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowLeft') handleTabChange(false)
    if (e.key === 'ArrowRight') handleTabChange(true)
  }

  const [activeTab] = tabs.filter((tab) => tab.id === currentTab)
  return (
    <div role="tabpanel">
      <ul
        ref={tabsRef}
        role="tablist"
        className="Tabs"
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ borderBottomColor: color }}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={currentTab === tab.id}
            onClick={() => handleClick(tab.id, tab?.onClick)}
            color={color}
            hoverColors={hovered}
            onIsActiveChange={setPhantom}
          />
        ))}
        <div
          className={`Tabs__phantom ${
            isFocused ? 'Tabs__phantom--is-focused' : ''
          } ${hasKeyboardFocus ? 'Tabs__phantom--is-keyboard-focused' : ''}`}
          style={{
            width: phantom.width,
            left: phantom.left,
            borderColor: color,
          }}
        >
          <div
            className="Tabs__bottom-cover"
            style={{ background: `var(--color-${on})` }}
          />
        </div>
      </ul>
      {activeTab?.component}
    </div>
  )
}
