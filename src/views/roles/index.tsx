
"use client"
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import RoleCards from './RoleCards'
import AddDrawer from './AddDrawer'
import { Role } from '@/types/api/common/Role'

const Roles = ({ roles }: { roles?: Role[] }) => {
  const [open, setOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const handleEditRole = (role: Role) => {
    setSelectedRole(role) // Pass the selected role data to the drawer
    setOpen(true)
  }

  const handleAddRole = () => {
    setSelectedRole(null) // Clear selected role when adding a new one
    setOpen(true)
  }

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
            <Button
              variant='contained'
              onClick={handleAddRole}
              endIcon={<i className='ri-add-fill' />}
            >
              أضافة دور
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          {roles && <RoleCards roles={roles} onEditRole={handleEditRole} />}
        </Grid>
      </Grid>

      <AddDrawer open={open} onClose={() => setOpen(false)} role={selectedRole} />
    </>
  )
}

export default Roles
