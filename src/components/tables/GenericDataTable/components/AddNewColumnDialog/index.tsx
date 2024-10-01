import { Box, Button } from '@mui/material'

export default function AddNewColumnToTable() {
  return (
    <Box my={4}>
      <Button variant='outlined' onClick={() => console.log('add new column to table')}>
        أضافة عمود جديد
      </Button>
    </Box>
  )
}
