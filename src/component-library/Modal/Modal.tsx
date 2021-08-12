import React, { useEffect, CSSProperties, FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { StandardLonghandProperties } from 'csstype'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button'
import { FlexBox } from '../Box'
import './Modal.scss'

type ModalProps = {
  offClick?: () => void
  noBackground?: boolean
  positionFromTop?: StandardLonghandProperties['marginTop']
  className?: string
  style?: CSSProperties
  header?: ReactNode
}

export const Modal: FC<ModalProps> = ({
  offClick,
  children,
  noBackground = false,
  positionFromTop,
  className,
  style = {},
  header,
}) => {
  useEffect(() => {
    window.document.body.style.overflow = 'hidden'
    return () => {
      window.document.body.style.overflow = 'auto'
    }
  }, [])

  return createPortal(
    <div className="Modal">
      <div role="presentation" className="Modal__shade" onClick={offClick} />
      <div
        role="dialog"
        className={classNames('Modal__content', className, {
          'Modal__content--has-no-background': noBackground,
        })}
        style={{
          maxHeight: positionFromTop
            ? `calc(100vh - 3rem - ${positionFromTop})`
            : 'calc(100vh - 3rem)',
          alignSelf: positionFromTop ? 'start' : undefined,
          marginTop: positionFromTop,
          ...style,
        }}
      >
        {header && (
          <FlexBox
            flexGrow={1}
            justifyContent={header ? 'space-between' : 'flex-end'}
            UNSAFE_className="Modal__header"
          >
            {header && header}
            <Button
              onClick={offClick}
              iconLeft={<FontAwesomeIcon icon={faTimes} />}
              UNSAFE_className="Modal__close"
            />
          </FlexBox>
        )}
        <div className="Modal__scrollable-content">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
