import React, { FC, ReactNode, useState } from 'react'
import './AvatarWrapper.scss'

type AvatarWrapperType = {
  children: ReactNode
  onClick: () => void
  hoverOverlay?: JSX.Element
  avatarRef?: React.Ref<HTMLButtonElement>
}

export const AvatarWrapper: FC<AvatarWrapperType> = ({
  children,
  onClick,
  hoverOverlay,
  avatarRef,
}) => {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <>
      <button
        ref={avatarRef}
        type="button"
        className={`AvatarWrapper ${
          showOverlay && hoverOverlay ? 'AvatarWrapper--dim' : ''
        }`}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onFocus={() => setShowOverlay(true)}
        onBlur={() => setShowOverlay(false)}
        onClick={onClick}
      >
        {showOverlay && hoverOverlay && (
          <div className="AvatarWrapper__overlay">{hoverOverlay}</div>
        )}
        {children}
      </button>
    </>
  )
}
