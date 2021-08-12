import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { Text } from '../Text'
import './LargeIconButton.scss'

type LargeIconButtonType = {
  title: string
  subTitle?: string | JSX.Element
  disabled?: boolean
  icon?: JSX.Element
  rightText?: string | JSX.Element
} & (
  | { onClick?: () => void; to?: undefined }
  | { onClick?: undefined; to?: LinkProps['to'] }
)

export const LargeIconButton: React.FC<LargeIconButtonType> = ({
  title,
  subTitle,
  disabled = false,
  onClick,
  icon,
  rightText,
  to,
}) => {
  const buttonContent = (
    <>
      {icon && <span className="LargeIconButton__icon">{icon}</span>}
      <div className="LargeIconButton__content">
        <p className="LargeIconButton__title">{title}</p>
        {subTitle && (
          <Text on="white" kind="primary" size="s">
            {subTitle}
          </Text>
        )}
      </div>
      {rightText && (
        <span className="LargeIconButton__right-text">{rightText}</span>
      )}{' '}
    </>
  )

  const buttonProps = {
    onClick,
    disabled,
  }

  return to && !disabled ? (
    <Link to={to} className="LargeIconButton LargeIconButton__link">
      {buttonContent}
    </Link>
  ) : (
    <button {...buttonProps} type="button" className="LargeIconButton">
      {buttonContent}
    </button>
  )
}
