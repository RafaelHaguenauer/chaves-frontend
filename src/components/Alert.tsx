type AlertProps = { type?: 'success' | 'error' | 'info' | 'warning'; children: React.ReactNode }
const colors = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
}
const Alert = ({ type = 'info', children }: AlertProps) => (
  <div className={`border-l-4 p-4 mb-2 rounded ${colors[type]}`}>{children}</div>
)
export default Alert
