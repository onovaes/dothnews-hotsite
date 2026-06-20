import { useId, useRef, useEffect, useCallback } from 'react'

const sizeMap = {
  sm: { field: 'min-h-24 px-4 py-3 text-sm', labelTop: 'top-3.5 peer-focus/input:top-3.5' },
  default: { field: 'min-h-28 px-5 py-4 text-sm', labelTop: 'top-4 peer-focus/input:top-4' },
  lg: { field: 'min-h-36 px-5 py-4 text-base', labelTop: 'top-4 peer-focus/input:top-4' },
}

const resizeMap = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
}

export function FormTextarea({
  name,
  id,
  label,
  value,
  defaultValue,
  placeholder = ' ',
  maxLength,
  required,
  disabled,
  readOnly,
  autoComplete,
  autoFocus,
  helper,
  error,
  rows = 4,
  resize = 'vertical',
  autoResize = false,
  showCount = false,
  size = 'default',
  iconLeft,
  iconRight,
  leftSlot,
  rightSlot,
  wrapperClassName = '',
  textareaClassName = '',
  onChange,
  ...rest
}) {
  const uid = useId()
  const textareaId = id ?? name?.replace(/[\[\]]/g, '_') ?? uid
  const helperId = `${textareaId}-helper`
  const errorId = `${textareaId}-error`
  const ref = useRef(null)

  const hasLeft = iconLeft || leftSlot
  const hasRight = iconRight || rightSlot
  const sz = sizeMap[size]

  const describedBy = [error ? errorId : null, !error && helper ? helperId : null]
    .filter(Boolean).join(' ') || undefined

  const doResize = useCallback((el) => {
    if (!el || !autoResize) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [autoResize])

  useEffect(() => {
    doResize(ref.current)
  }, [value, doResize])

  useEffect(() => {
    doResize(ref.current)
  }, [])

  const handleChange = (e) => {
    doResize(e.target)
    onChange?.(e)
  }

  const fieldCls = [
    'peer/input w-full rounded-[6px] appearance-none',
    'bg-transparent border border-line text-ink',
    'placeholder:text-transparent leading-relaxed',
    'transition-[border-color,box-shadow] duration-200',
    'focus:outline-none focus:ring-0',
    'focus:border-b-2 focus:border-line focus:border-b-primary',
    'focus:shadow-[0_0_0_2px_rgba(43,0,201,0.14)]',
    'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-faint disabled:opacity-70',
    'read-only:bg-neutral-50 read-only:text-mute',
    sz.field,
    hasLeft ? 'pl-12' : '',
    hasRight ? 'pr-12' : '',
    autoResize ? 'overflow-hidden resize-none' : resizeMap[resize],
    showCount && maxLength ? 'pb-8' : '',
    error ? 'border-red-300 border-2 bg-red-50 text-red-700 focus:border-red-400 focus:border-b-red-500 focus:shadow-none' : '',
    textareaClassName,
  ].filter(Boolean).join(' ')

  const labelCls = [
    'pointer-events-none absolute z-10 origin-[0] -translate-y-4 transform bg-white px-2 text-sm duration-300',
    sz.labelTop,
    hasLeft ? 'left-10' : 'left-3',
    // For textarea: "in field" position is near the top, not vertically centered
    'peer-placeholder-shown/input:-translate-y-0 peer-placeholder-shown/input:scale-100',
    'peer-focus/input:-translate-y-4 peer-focus/input:px-2 peer-focus/input:text-primary',
    'peer-disabled/input:text-faint peer-read-only/input:text-mute',
    error ? 'font-medium text-red-500 peer-focus/input:text-red-500' : 'text-mute',
  ].filter(Boolean).join(' ')

  return (
    <fieldset className={`w-full ${wrapperClassName}`}>
      <div className="relative w-full">
        {hasLeft && (
          <span className="pointer-events-none absolute top-0 left-0 z-10 flex h-14 w-12 items-center justify-center text-faint">
            {iconLeft || leftSlot}
          </span>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          rows={autoResize ? undefined : rows}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          className={fieldCls}
          onChange={handleChange}
          {...rest}
        />

        {label && (
          <label htmlFor={textareaId} className={labelCls}>
            {label}
          </label>
        )}

        {hasRight && (
          <span className="absolute top-0 right-0 z-10 flex h-14 w-12 items-center justify-center text-faint">
            {iconRight || rightSlot}
          </span>
        )}

        {showCount && maxLength && (
          <span className="absolute bottom-3 right-3 z-10 select-none rounded bg-white px-1 text-xs text-faint pointer-events-none">
            {typeof value === 'string' ? value.length : 0}/{maxLength}
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
