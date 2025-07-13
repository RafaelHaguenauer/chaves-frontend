type SwitchToggleProps = { checked: boolean; onChange: () => void }
const SwitchToggle = ({ checked, onChange }: SwitchToggleProps) => (
  <button
    onClick={onChange}
    className={`w-12 h-6 rounded-full ${checked ? 'bg-green-500' : 'bg-gray-300'} relative transition`}
    aria-pressed={checked}
  >
    <span
      className={`block w-6 h-6 bg-white rounded-full shadow absolute top-0 transition ${checked ? 'right-0' : 'left-0'}`}
    />
  </button>
)
export default SwitchToggle
