import { FilePondInitialFile } from 'filepond'

declare module 'filepond-plugin-image-preview'
declare module 'filepond-plugin-file-validate-type'

export type FileBondState = (string | FilePondInitialFile | Blob)[]
