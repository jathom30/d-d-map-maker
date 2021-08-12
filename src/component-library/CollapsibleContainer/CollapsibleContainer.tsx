import React, { useEffect, useRef, useState } from 'react'
import './CollapsibleContainer.scss'

export const CollapsibleContainer: React.FC<{
  isOpen: boolean
}> = ({ isOpen, children }) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(bodyRef.current?.clientHeight)

  useEffect(() => {
    if (!bodyRef.current) return
    setHeight(bodyRef.current.clientHeight)
  }, [bodyRef.current?.clientHeight, children])

  return (
    <div
      className="CollapsibleContainer"
      style={{ height: isOpen ? height : 0 }}
    >
      <div ref={bodyRef}>{children}</div>
    </div>
  )
}
