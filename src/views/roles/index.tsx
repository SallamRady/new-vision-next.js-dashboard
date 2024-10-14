'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import RoleCards from './RoleCards'
import { Role } from '@/types/api/common/Role'
import { Button } from '@mui/material'
import AddDrawer from './AddDrawer'
import { useState } from 'react'

const Roles = ({ roles }: { roles?: Role[] }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h4' className='mbe-1'>
            قائمة الأدوار
          </Typography>
          <Typography>
            دور يوفر إمكانية الوصول إلى القوائم والميزات المحددة مسبقًا بحيث يمكن للمسؤول، بناءً على الدور المخصص له،
            الوصول إلى ما يحتاج إليه
          </Typography>
          <div className='flex flex-row-reverse'>
            <Button variant='contained' onClick={() => setOpen(true)} endIcon={<i className='ri-add-fill' />}>
              أضافة دور
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          {roles && <RoleCards roles={roles} />}
        </Grid>
      </Grid>

      <AddDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Roles
