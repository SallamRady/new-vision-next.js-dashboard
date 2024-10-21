import { Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'

import RolesTable from './RolesTable'

function UsersRoles() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={5} md={3} lg={2}>
        <Paper>
          <MenuList
            sx={{
              width: 1,
              '.MuiMenuItem-root': {
                py: 6
              }
            }}
          >
            <MenuItem>
              <ListItemText> اضافة</ListItemText>
              <ListItemIcon>
                <i className='ri-add-fill' />
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText> تعديل</ListItemText>
              <ListItemIcon>
                <i className='ri-edit-2-fill' />
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText> الكل</ListItemText>
              <ListItemIcon>
                <i className='ri-eye-line' />
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        </Paper>
      </Grid>
      <Grid item xs={7} md={9} lg={10}>
        <RolesTable />
      </Grid>
    </Grid>
  )
}

export default UsersRoles
