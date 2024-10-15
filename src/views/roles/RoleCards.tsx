
"use client"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import MenuList from '@mui/material/MenuList'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import EditIcon from '@mui/icons-material/Edit'
import { Role } from '@/types/api/common/Role'

const RoleCards = ({ roles, onEditRole }: { roles: Role[], onEditRole: (role: Role) => void }) => {
  return (
    <Grid container spacing={6}>
      {roles.map((role) => (
        <Grid item xs={12} sm={6} lg={4} key={role.id}>
          <Card sx={{ height: 1 }}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex justify-between items-center'>
                <Typography variant='h5'>{role.name}</Typography>
                <IconButton onClick={() => onEditRole(role)}> {/* Trigger edit with the specific role */}
                  <EditIcon />
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
  )
}

export default RoleCards
