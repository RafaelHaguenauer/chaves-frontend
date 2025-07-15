type DownloadButtonProps = { url: string; filename?: string }
const DownloadButton = ({ url, filename = 'arquivo' }: DownloadButtonProps) => (
  <a href={url} download={filename} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Baixar
  </a>
)
export default DownloadButton
