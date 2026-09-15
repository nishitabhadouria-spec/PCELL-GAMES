import { Link } from 'react-router-dom'

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  to,
  onClick,
  disabled,
  full,
  className = '',
}) {
  const cls = `btn btn-${variant}${full ? ' btn-full' : ''} ${className}`.trim()
  if (to && !disabled) {
    return (
      <Link className={cls} to={to}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
