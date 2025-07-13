import { useState } from 'react'
type TooltipProps = { text: string; children: React.ReactNode }
const Tooltip = ({ text, children }: TooltipProps) => {
  const [show, setShow] = useState(false)
  return (
    <span className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded shadow z-50 whitespace-nowrap">
          {text}
        </span>
      )}
    </span>
  )
}
export default Tooltip
