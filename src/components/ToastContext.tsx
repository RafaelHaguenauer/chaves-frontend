import { createContext, useContext, useState, ReactNode } from 'react'

type Toast = { message: string; type: 'success' | 'error' }

type ToastContextType = {
  showToast: (message: string, type: 'success' | 'error') => void
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} })

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white z-50 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}
