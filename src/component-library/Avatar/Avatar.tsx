import React, { FC, CSSProperties } from 'react'
import classNames from 'classnames'
import { AvatarWrapper } from '../AvatarWrapper'
import './Avatar.scss'

type AvatarType = {
  size?: 's' | 'm' | 'l' | 'xl'
  rounded?: boolean
  onClick?: () => void
  hoverOverlay?: JSX.Element
  UNSAFE_className?: string
  avatarRef?: React.Ref<HTMLButtonElement>
} & ({ src: string; name?: string } | { src?: string; name: string })
// Requires either src or name or both

export const Avatar: FC<AvatarType> = React.memo(
  ({
    src,
    name = '',
    size = 'm',
    rounded = false,
    onClick,
    hoverOverlay,
    UNSAFE_className,
    avatarRef,
  }) => {
    const backgrounds = [
      'primary-200',
      'secondary-300',
      'tertiary-300',
      'success-400',
      'warning-600',
    ]

    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)]

    const _style: CSSProperties = {
      backgroundColor: `var(--color-${randomBg})`,
      color: `var(--text-on-${randomBg})`,
    }

    const sizeClass = `Avatar--${size}-size`

    const wrapperClasses = classNames(
      'Avatar',
      sizeClass,
      {
        'Avatar--rounded': rounded,
      },
      UNSAFE_className,
    )

    const getInitials = () => {
      return name.match(/\b(\w)/g)?.slice(0, 3) || ''
    }

    return onClick ? (
      <AvatarWrapper
        avatarRef={avatarRef}
        onClick={onClick}
        hoverOverlay={hoverOverlay}
      >
        <div className={wrapperClasses} style={{ ..._style }}>
          {src ? <img src={src} alt={`${name} Avatar`} /> : getInitials()}
        </div>
      </AvatarWrapper>
    ) : (
      <div className={wrapperClasses} style={{ ..._style }}>
        {src ? <img src={src} alt={`${name} Avatar`} /> : getInitials()}
      </div>
    )
  },
)
