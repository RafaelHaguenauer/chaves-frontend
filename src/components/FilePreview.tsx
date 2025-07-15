import { useState } from 'react'

type FilePreviewProps = { file: File | null }

const FilePreview = ({ file }: FilePreviewProps) => {
  if (!file) return null
  const url = URL.createObjectURL(file)
  if (file.type.startsWith('image/')) {
    return <img src={url} alt="preview" className="max-w-xs max-h-60 mt-2" />
  }
  if (file.type === 'application/pdf') {
    return <embed src={url} type="application/pdf" width="300" height="400" className="mt-2" />
  }
  return <a href={url} download className="text-blue-600 underline mt-2 block">Baixar arquivo</a>
}

export default FilePreview
