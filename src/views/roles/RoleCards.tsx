'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import type { TypographyProps } from '@mui/material/Typography'
import type { CardProps } from '@mui/material/Card'

// Component Imports
import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'
import { Role } from '@/types/api/common/Role'
import { Divider, ListItem, ListItemText, MenuList } from '@mui/material'

const RoleCards = ({ roles }: { roles: Role[] }) => {
  // Vars

  return (
    <>
      <Grid container spacing={6}>
        {roles.map(role => (
          <Grid item xs={12} sm={6} lg={4} key={role.id}>
            <Card sx={{ height: 1 }}>
              <CardContent className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col items-start gap-1'>
                    <Typography variant='h5'>{role.name}</Typography>
                  </div>
                  <IconButton>
                    <i className='ri-file-copy-line text-secondary' />
                  </IconButton>
                </div>
                <Divider />
                <Typography>الصلاحيات</Typography>
                <MenuList>
                  {role.permissions?.map(({ id, label, name }) => (
                    <ListItem key={id}>
                      <ListItemText>{label || name}</ListItemText>
                    </ListItem>
                  ))}
                </MenuList>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default RoleCards
