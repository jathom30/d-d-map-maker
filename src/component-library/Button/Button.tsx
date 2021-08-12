import React from 'react'
import './Button.scss'
import classNames from 'classnames'
import * as CSS from 'csstype'
import { Link, LinkProps } from 'react-router-dom'

type ButtonProps = {
  children?: string
  iconLeft?: JSX.Element
  iconRight?: JSX.Element
  UNSAFE_className?: string
  rounded?: boolean
  type?: 'button' | 'submit'
  kind?: 'default' | 'primary' | 'danger' | 'text'
  size?: 's' | 'm' | 'l' | 'xl'
  width?: string
  UNSAFE_style?: CSS.Properties
  disabled?: boolean
  onMouseOver?: (event?: React.MouseEvent) => void
  onMouseOut?: (event?: React.MouseEvent) => void
} & (
  | { onClick?: (event?: React.MouseEvent) => void; to?: undefined }
  | { onClick?: undefined; to?: LinkProps['to'] }
)
type RefProps =
  | {
      buttonRef?:
        | React.Ref<HTMLButtonElement>
        | React.MutableRefObject<HTMLButtonElement>
      linkRef?: undefined
    }
  | {
      linkRef?:
        | React.Ref<HTMLAnchorElement>
        | React.MutableRefObject<HTMLAnchorElement>
      buttonRef?: undefined
    }

export const Button = ({
  children,
  iconLeft,
  iconRight,
  onClick,
  UNSAFE_className,
  rounded = false,
  type,
  kind = 'default',
  size = 'm',
  width,
  UNSAFE_style,
  disabled = false,
  onMouseOver,
  onMouseOut,
  to,
  buttonRef,
  linkRef,
}: ButtonProps & RefProps) => {
  const sizeClass = ` Button--${size}-size`

  const wrapperClasses = classNames(
    'Button',
    sizeClass,
    {
      'Button--primary': kind === 'primary',
      'Button--danger': kind === 'danger',
      'Button--text': kind === 'text',
      'Button--disabled': disabled,
      'Button--rounded': rounded,
      'Button--has-right-icon': !!iconRight,
      'Button--has-left-icon': !!iconLeft,
    },
    UNSAFE_className,
  )

  const handleMouseOver = (event: React.MouseEvent) => {
    if (onMouseOver) {
      onMouseOver(event)
    }
  }
  const handleMouseOut = (event: React.MouseEvent) => {
    if (onMouseOut) {
      onMouseOut(event)
    }
  }

  const handleClick = (event: React.MouseEvent) => {
    if (onClick && !disabled) {
      onClick(event)
    }
  }

  const customStyle: CSS.Properties = { width, ...UNSAFE_style }

  const RenderIcon = ({ icon }: { icon: JSX.Element }) => icon

  const buttonContent = (
    <>
      {iconLeft ? (
        <div className="Button__icon-wrapper">
          <RenderIcon icon={iconLeft} />
        </div>
      ) : null}
      {children ? <span className="Button__text">{children}</span> : null}
      {iconRight ? (
        <div className="Button__icon-wrapper">
          <RenderIcon icon={iconRight} />
        </div>
      ) : null}
    </>
  )

  const commonProps = {
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    style: customStyle,
    onFocus: () => false,
    onBlur: () => false,
  }

  const linkProps = {
    ...commonProps,
    ref: linkRef,
    className: `${wrapperClasses} Button__link`,
  }

  const buttonProps = {
    ...commonProps,
    onClick: handleClick,
    disabled,
    type: type || 'button',
    className: wrapperClasses,
    ref: buttonRef,
  }

  const renderButton = (passedType: 'button' | 'submit' | undefined) => {
    if (passedType === 'submit') {
      return (
        <button {...buttonProps} type="submit">
          {buttonContent}
        </button>
      )
    }
    return (
      <button {...buttonProps} type="button">
        {buttonContent}
      </button>
    )
  }

  return to && !disabled ? (
    <Link {...linkProps} to={to}>
      {buttonContent}
    </Link>
  ) : (
    renderButton(type)
  )
}
