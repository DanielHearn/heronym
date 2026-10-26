import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import './FieldSelect.less'

type FieldSelectOption = {
  value: string
  label: string
}

type FieldSelectProps = {
  label: string
  id: string
  value: string
  options: FieldSelectOption[]
  searchable?: boolean
  onChange: (value: string) => void
}

export default function FieldSelect({
  label,
  id,
  value,
  options,
  searchable = false,
  onChange,
}: FieldSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const selectedOption = options.find((option) => option.value === value)
  const filteredOptions = searchable
    ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
    : options

  function chooseOption(option: FieldSelectOption) {
    onChange(option.value)
    setQuery('')
    setActiveIndex(-1)
    setIsOpen(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((index) => {
        if (filteredOptions.length === 0) return -1
        if (event.key === 'ArrowDown') return (index + 1) % filteredOptions.length
        return index <= 0 ? filteredOptions.length - 1 : index - 1
      })
    } else if (event.key === 'Enter' && isOpen) {
      event.preventDefault()
      const option = filteredOptions[activeIndex] ?? filteredOptions[0]
      if (option) chooseOption(option)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
      setActiveIndex(-1)
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
    setActiveIndex(-1)
    setIsOpen(true)
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {searchable ? (
        <div className="searchable-select">
          <div className="searchable-select-control">
            <input
              ref={inputRef}
              id={id}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={isOpen}
              aria-controls={`${id}-options`}
              aria-activedescendant={
                activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
              }
              autoComplete="off"
              value={isOpen ? query : selectedOption?.label ?? ''}
              onFocus={(event) => {
                setIsOpen(true)
                event.currentTarget.select()
              }}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={(event) => {
                if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) {
                  setIsOpen(false)
                  setQuery('')
                  setActiveIndex(-1)
                }
              }}
            />
            <button
              type="button"
              className="searchable-select-toggle"
              tabIndex={-1}
              aria-label={`${isOpen ? 'Hide' : 'Show'} ${label.toLowerCase()} options`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                if (isOpen) {
                  setIsOpen(false)
                  setQuery('')
                  setActiveIndex(-1)
                } else {
                  setIsOpen(true)
                  inputRef.current?.focus()
                }
              }}
            >
              <span aria-hidden="true">▾</span>
            </button>
          </div>
          {isOpen && (
            <ul id={`${id}-options`} className="searchable-select-options" role="listbox">
              {filteredOptions.length ? (
                filteredOptions.map((option, index) => (
                  <li key={option.value} role="presentation">
                    <button
                      id={`${id}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={option.value === value}
                      className={index === activeIndex ? 'active' : ''}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => chooseOption(option)}
                    >
                      {option.label}
                    </button>
                  </li>
                ))
              ) : (
                <li className="searchable-select-empty">No matches</li>
              )}
            </ul>
          )}
        </div>
      ) : (
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}