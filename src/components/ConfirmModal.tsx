type ConfirmModalProps = {
  open: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}
const ConfirmModal = ({ open, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl">
        <p className="mb-4">{message}</p>
        <div className="flex gap-4 justify-end">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Confirmar</button>
        </div>
      </div>
    </div>
  )
}
export default ConfirmModal
