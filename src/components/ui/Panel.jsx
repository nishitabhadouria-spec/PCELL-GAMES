export default function Panel({ children, className = '', accent = 'cyan', as: Tag = 'div' }) {
  return <Tag className={`panel accent-${accent} ${className}`.trim()}>{children}</Tag>
}
