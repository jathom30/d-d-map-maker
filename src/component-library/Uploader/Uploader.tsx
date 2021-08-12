import React, { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import './Uploader.scss'

type FileUploadType = {
  acceptedFiles: File[]
  rejectedFiles: FileRejection[]
}

type UploaderType = {
  onDropFile: (files: FileUploadType) => void
  type: 'banner' | 'video'
}

const mimeTypes = {
  // audience: ['text/csv', 'text/plain', 'application/vnd.ms-excel', '.csv'],
  banner: [
    'image/jpeg',
    'image/gif',
    'image/png',
    'application/zip',
    'application/x-gzip',
    'application/octet-stream',
  ],
  video: [
    'video/x-flv',
    'video/mp4',
    'video/mov',
    'video/webm',
    'video/x-ms-wmv',
    'video/x-msvideo',
    'video/avi',
    'video/quicktime',
    'video/3gpp',
  ],
  // audio: ['audio/x-m4a', 'audio/ogg', 'audio/mpeg', 'audio/mp3'],
}

const maxSize = {
  // audience: 100000,
  banner: 100000,
  video: 100000000,
}

export const Uploader: React.FC<UploaderType> = ({
  children,
  onDropFile,
  type,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      onDropFile({
        acceptedFiles,
        rejectedFiles: fileRejections,
      })
    },
    [],
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: mimeTypes[type],
    maxSize: maxSize[type],
  })
  /* eslint-disable */
  return (
    <div className="Uploader" {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}
