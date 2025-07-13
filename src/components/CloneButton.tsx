type CloneButtonProps = { onClone: () => void }
const CloneButton = ({ onClone }: CloneButtonProps) => (
  <button onClick={onClone} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
    Clonar
  </button>
)
export default CloneButton
