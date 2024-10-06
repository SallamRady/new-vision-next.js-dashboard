// MUI Imports
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export default function WarningAlert(props: PropsType) {
  const { title, content } = props

  return (
    <Alert severity='warning'>
      <AlertTitle>{title}</AlertTitle>
      {content}
    </Alert>
  )
}

type PropsType = {
  title: React.ReactNode
  content: React.ReactNode
}
