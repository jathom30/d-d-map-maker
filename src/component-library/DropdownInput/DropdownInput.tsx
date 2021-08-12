import React from 'react'
import './DropdownInput.scss'

export const DropdownInput: React.FC<{ options: any[]; loading?: boolean }> = ({
  options,
  loading = false,
  children,
}) => {
  return (
    <div className="DropdownInput">
      {children}
      {options.length > 0 && (
        <div className="DropdownInput__dropdown">
          {options.map((option: any, index: number) => (
            <button
              key={index}
              type="button"
              className="DropdownInput__result"
              onClick={option.onClick}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {loading && (
        <div className="DropdownInput__dropdown DropdownInput__dropdown--loading">
          <p>Loading results...</p>
        </div>
      )}
    </div>
  )
}
