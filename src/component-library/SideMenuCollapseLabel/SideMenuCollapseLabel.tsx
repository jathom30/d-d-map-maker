import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
import { Spacer } from '../Spacer'
import './SideMenuCollapseLabel.scss'

export const SideMenuCollapseLabel: React.FC<{
  isOpen: boolean
  label: ReactNode
}> = ({ isOpen, label }) => {
  return (
    <div className="SideMenuCollapseLabel">
      {label}
      <Spacer width="0.5rem" />
      <FontAwesomeIcon icon={!isOpen ? faCaretRight : faCaretDown} />
    </div>
  )
}
