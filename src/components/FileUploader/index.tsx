'use client'

// React Imports
import { SetStateAction } from 'react'

// MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Icon Imports
import { useDropzone } from 'react-dropzone'
import { errorMessage } from '@/utils/notificationsMessages'

type FileProp = {
  name: string
  type: string
  size: number
}

export default function FileUploader(props: PropsType) {
  // States
  const {
    files,
    setFiles,
    maxFiles = 1,
    maxSize = 2000000,
    label,
    typeHelperMessage = 'Allowed *.jpeg, *.jpg, *.png, *.gif',
    handleChange
  } = props

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFiles,
    maxSize: maxSize,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      if (handleChange) {
        handleChange(acceptedFiles)
      }
    },
    onDropRejected: () => {
      errorMessage(`You can only upload ${maxFiles} files & maximum size of 2 MB.`)
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <i className='ri-file-text-line' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)

    if (handleChange) {
      handleChange([...filtered])
    }
    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='ri-close-line text-xl' />
      </IconButton>
    </ListItem>
  ))

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='flex items-center flex-col'>
          <Avatar variant='rounded' className='bs-12 is-12 mbe-9 bg-primary'>
            <i className='ri-upload-2-line' />
          </Avatar>
          <Typography variant='body2' className='mbe-2.5' textAlign={'center'}>
            {Boolean(label) && (
              <>
                {label}
                <br />
              </>
            )}
            Drop files here or click to upload.
          </Typography>
          <Typography color='text.secondary'>{typeHelperMessage}</Typography>
          <Typography color='text.secondary'>Max {maxFiles} files and max size of 2 MB</Typography>
        </div>
      </div>
      {files.length ? (
        <>
          <List>{fileList}</List>
        </>
      ) : null}
    </>
  )
}

type PropsType = {
  files: File[]
  setFiles: React.Dispatch<SetStateAction<File[]>>
  label?: string
  typeHelperMessage?: string
  maxFiles?: number
  maxSize?: number
  handleChange?: (files: File[]) => void
}
