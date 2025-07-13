import { useState } from 'react'
type Props = { fetchSuggestions: (q: string) => Promise<string[]>; onSelect: (value: string) => void }
const AutocompleteInput = ({ fetchSuggestions, onSelect }: Props) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (e.target.value.length > 1) {
      setSuggestions(await fetchSuggestions(e.target.value))
    } else {
      setSuggestions([])
    }
  }
  return (
    <div>
      <input value={value} onChange={handleChange} className="border p-2 rounded" />
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded shadow absolute z-10">
          {suggestions.map(s => (
            <li key={s} onClick={() => { setValue(s); setSuggestions([]); onSelect(s) }} className="p-2 cursor-pointer hover:bg-gray-100">{s}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default AutocompleteInput
