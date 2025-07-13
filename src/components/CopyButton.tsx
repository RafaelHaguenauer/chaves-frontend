type CopyButtonProps = { text: string }
const CopyButton = ({ text }: CopyButtonProps) => {
  const handleCopy = () => navigator.clipboard.writeText(text)
  return (
    <button onClick={handleCopy} className="bg-gray-200 px-2 py-1 rounded">
      Copiar
    </button>
  )
}
export default CopyButton
