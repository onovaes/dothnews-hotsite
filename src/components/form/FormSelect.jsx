import { useId, useState } from 'react'

const sizeMap = {
  sm: {
    field: 'h-12 px-4 text-sm',
    labelFloated: 'text-xs top-1.5 -translate-y-4',
    labelInField: 'text-sm top-1/2 -translate-y-1/2 scale-100',
  },
  default: {
    field: 'h-14 px-5 text-sm',
    labelFloated: 'text-sm top-2 -translate-y-4',
    labelInField: 'text-sm top-1/2 -translate-y-1/2 scale-100',
  },
  lg: {
    field: 'h-16 px-5 text-base',
    labelFloated: 'text-sm top-2 -translate-y-4',
    labelInField: 'text-base top-1/2 -translate-y-1/2 scale-100',
  },
}

export function FormSelect({
  name,
  id,
  label,
  value,
  defaultValue,
  options = [],
  placeholder = 'Selecione',
  required,
  disabled,
  helper,
  error,
  size = 'default',
  iconLeft,
  iconRight,
  wrapperClassName = '',
  selectClassName = '',
  onChange,
  onFocus,
  onBlur,
  ...rest
}) {
  const uid = useId()
  const selectId = id ?? name?.replace(/[\[\]]/g, '_') ?? uid
  const helperId = `${selectId}-helper`
  const errorId = `${selectId}-error`

  const isControlled = value !== undefined
  const [internalFilled, setInternalFilled] = useState(
    () => (defaultValue ?? '') !== ''
  )
  const [focused, setFocused] = useState(false)

  const isFilled = isControlled ? value !== '' : internalFilled
  const labelFloated = isFilled || focused

  const hasLeft = iconLeft
  const hasRight = iconRight
  const sz = sizeMap[size]

  const describedBy = [error ? errorId : null, !error && helper ? helperId : null]
    .filter(Boolean).join(' ') || undefined

  const fieldCls = [
    'peer/input w-full rounded-[6px] appearance-none',
    'bg-transparent border border-line text-ink cursor-pointer',
    'transition-[border-color,box-shadow] duration-200',
    'focus:outline-none focus:ring-0',
    'focus:border-b-2 focus:border-line focus:border-b-primary',
    'focus:shadow-[0_0_0_2px_rgba(43,0,201,0.14)]',
    'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-faint disabled:opacity-70',
    sz.field,
    hasLeft ? 'pl-12' : '',
    hasRight ? 'pr-12' : '',
    error ? 'border-red-300 border-2 bg-red-50 text-red-700 focus:border-red-400 focus:border-b-red-500 focus:shadow-none' : '',
    selectClassName,
  ].filter(Boolean).join(' ')

  const labelCls = [
    'pointer-events-none absolute z-10 origin-[0] transform bg-white px-2 duration-300',
    hasLeft ? 'left-10' : 'left-3',
    labelFloated ? sz.labelFloated : sz.labelInField,
    focused ? 'text-primary' : error ? 'text-red-500' : isFilled ? 'text-mute' : 'text-mute',
    error && labelFloated ? 'font-medium text-red-500' : '',
  ].filter(Boolean).join(' ')

  const handleChange = (e) => {
    if (!isControlled) setInternalFilled(e.target.value !== '')
    onChange?.(e)
  }

  const handleFocus = (e) => {
    setFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setFocused(false)
    onBlur?.(e)
  }

  return (
    <fieldset className={`w-full ${wrapperClassName}`}>
      <div className="relative w-full">
        {hasLeft && (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center text-faint">
            {iconLeft}
          </span>
        )}

        <select
          id={selectId}
          name={name}
          value={value}
          defaultValue={defaultValue ?? ''}
          required={required}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          className={fieldCls}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {label && (
          <label htmlFor={selectId} className={labelCls}>
            {label}
          </label>
        )}

        {hasRight && (
          <span className="absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-center text-faint">
            {iconRight}
          </span>
        )}

        {/* Custom chevron */}
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-faint">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </span>
      </div>

      {error ? (
        <div id={errorId} className="flex items-center gap-1.5 mt-1">
          <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-red-600">{error}</span>
        </div>
      ) : helper ? (
        <p id={helperId} className="mt-2 text-xs leading-relaxed text-mute">
          {helper}
        </p>
      ) : null}
    </fieldset>
  )
}
