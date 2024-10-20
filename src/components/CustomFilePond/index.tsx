import React from 'react'
import { FilePond } from 'react-filepond'
import type { FilePondProps } from 'react-filepond'

interface CustomFilePondProps extends FilePondProps {
  labelIdle?: string
}

export const CustomFilePond: React.FC<CustomFilePondProps> = ({
  labelIdle = 'أفلت الملفات أو تصفح.. <span class="filepond--label-action">تصفح</span>',
  ...props
}) => {
  return <FilePond labelIdle={labelIdle} {...props} />
}

export default CustomFilePond
