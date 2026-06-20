import { useId } from 'react'

const sizeMap = {
  sm: {
    field: 'h-12 px-4 text-sm',
    label: 'text-xs peer-placeholder-shown/input:text-sm peer-focus/input:text-xs',
    labelTop: 'top-1.5 peer-focus/input:top-1.5',
  },
  default: {
    field: 'h-14 px-5 text-sm',
    label: 'text-sm',
    labelTop: 'top-2 peer-focus/input:top-2',
  },
  lg: {
    field: 'h-16 px-5 text-base',
    label: 'text-sm peer-placeholder-shown/input:text-base peer-focus/input:text-sm',
    labelTop: 'top-2 peer-focus/input:top-2',
  },
}

export function FormInput({
  name,
  id,
  label,
  type = 'text',
  value,
  defaultValue,
  placeholder = ' ',
  maxLength,
  required,
  disabled,
  readOnly,
  autoComplete,
  autoFocus,
  inputMode,
  inputRef,
  helper,
  error,
  size = 'default',
  iconLeft,
  iconRight,
  leftSlot,
  rightSlot,
  wrapperClassName = '',
  inputClassName = '',
  ...rest
}) {
  const uid = useId()
  const inputId = id ?? name?.replace(/[\[\]]/g, '_') ?? uid
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`

  const hasLeft = iconLeft || leftSlot
  const hasRight = iconRight || rightSlot
  const sz = sizeMap[size]

  const describedBy = [error ? errorId : null, !error && helper ? helperId : null]
    .filter(Boolean).join(' ') || undefined

  const fieldCls = [
    'peer/input w-full rounded-[6px] appearance-none',
    'bg-transparent border border-line text-ink',
    'placeholder:text-transparent',
    'transition-[border-color,box-shadow] duration-200',
    'focus:outline-none focus:ring-0',
    'focus:border-b-2 focus:border-line focus:border-b-primary',
    'focus:shadow-[0_0_0_2px_rgba(43,0,201,0.14)]',
    'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-faint disabled:opacity-70',
    'read-only:bg-neutral-50 read-only:text-mute',
    sz.field,
    hasLeft ? 'pl-12' : '',
    hasRight ? 'pr-12' : '',
    error ? 'border-red-300 border-2 bg-red-50 text-red-700 focus:border-red-400 focus:border-b-red-500 focus:shadow-none' : '',
    inputClassName,
  ].filter(Boolean).join(' ')

  const labelCls = [
    'pointer-events-none absolute z-10 origin-[0] -translate-y-4 transform bg-white px-2 duration-300',
    sz.label,
    sz.labelTop,
    hasLeft ? 'left-10' : 'left-3',
    'peer-placeholder-shown/input:top-1/2 peer-placeholder-shown/input:-translate-y-1/2 peer-placeholder-shown/input:scale-100',
    'peer-focus/input:-translate-y-4 peer-focus/input:px-2 peer-focus/input:text-primary',
    'peer-disabled/input:text-faint peer-read-only/input:text-mute',
    error ? 'font-medium text-red-500 peer-focus/input:text-red-500' : 'text-mute',
  ].filter(Boolean).join(' ')

  return (
    <fieldset className={`w-full ${wrapperClassName}`}>
      <div className="relative w-full">
        {hasLeft && (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center text-faint">
            {iconLeft || leftSlot}
          </span>
        )}

        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          inputMode={inputMode}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          className={fieldCls}
          {...rest}
        />

        {label && (
          <label htmlFor={inputId} className={labelCls}>
            {label}
          </label>
        )}

        {hasRight && (
          <span className="absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-center text-faint">
            {iconRight || rightSlot}
          </span>
        )}
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
