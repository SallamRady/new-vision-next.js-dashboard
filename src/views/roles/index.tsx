'use client'

// MUI Imports
import { useState } from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import { Button } from '@mui/material'

import RoleCards from './RoleCards'
import type { Role } from '@/types/api/common/Role'
import AddDrawer from './AddDrawer'

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
