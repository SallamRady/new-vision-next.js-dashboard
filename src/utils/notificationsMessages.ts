import { Bounce, toast } from 'react-toastify'

export function SuccessMessage(statment: string) {
  toast.success(statment, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
    bodyStyle: {
      textAlign: 'right',
      fontSize: '16px',
      fontWeight: 800
    }
  })
}

export function errorMessage(statment: string) {
  toast.error(statment, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
    bodyStyle: {
      textAlign: 'right',
      fontSize: '16px',
      fontWeight: 800
    }
  })
}
