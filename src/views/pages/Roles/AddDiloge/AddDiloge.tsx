'use client'
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useState } from 'react'

function EditTap({ open, onClose }: EditTaptype) {
  const [inputFields, setInputFields] = useState([{ value: '' }])

  const handleInputChange = (index: number, value: string) => {
    const newInputFields = [...inputFields]
    newInputFields[index].value = value
    setInputFields(newInputFields)
  }

  const handleAddInput = () => {
    setInputFields([...inputFields, { value: '' }])
  }

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(
      'Submitted:',
      inputFields.map(field => field.value)
    )
    onClose() // Close the modal after submission
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Typography variant='h2'>اضافه دور </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {inputFields.map((inputField, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label={`المسؤوليات ${index + 1}`}
                value={inputField.value}
                onChange={e => handleInputChange(index, e.target.value)}
                variant='outlined'
                fullWidth
              />
              {index === inputFields.length - 1 && (
                <Button variant='outlined' onClick={handleAddInput}>
                  Add More
                </Button>
              )}
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant='contained'
              onClick={handleSubmit}
              sx={{ backgroundColor: 'var(--mui-palette-primary-main)' }}
            >
              Submit
            </Button>
            <Button variant='outlined' onClick={onClose} sx={{ borderColor: 'var(--mui-palette-primary-main)' }}>
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default EditTap

interface EditTaptype {
  open: boolean
  onClose: () => void
}
