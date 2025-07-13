import { useState } from 'react'
type Props = { onUpload: (file: File) => void }
const UploadFileForm = ({ onUpload }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) onUpload(file)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button type="submit" disabled={!file}>Enviar</button>
    </form>
  )
}
export default UploadFileForm
