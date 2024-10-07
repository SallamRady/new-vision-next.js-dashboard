import IssueIcon from '@/components/IssueIcon'
import { Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Tab, Tabs, TextField } from '@mui/material'
import type { GridProps, TextFieldProps } from '@mui/material'

const GridItem = (props: GridProps) => <Grid item xs={12} md={6} {...props} />

const getTextFieldProps = (props?: TextFieldProps): TextFieldProps => ({
  fullWidth: true,
  // placeholder: props?.label as string,
  label: 'حقل ادخال',
  placeholder: 'حقل ادخال',
  ...props
})

function PersonalDetails() {
  return (
    <Grid container spacing={4}>
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
              <ListItemText>البيانات الشخصية</ListItemText>
              <ListItemIcon>
                <IssueIcon />
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText>المعلومات البنكية</ListItemText>
              <ListItemIcon>
                <IssueIcon />
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText>معلومات الاتصال</ListItemText>
              <ListItemIcon>
                <IssueIcon />
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        </Paper>
      </Grid>
      <Grid item container spacing={4} xs={7} md={9} lg={10}>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
        <GridItem>
          <TextField {...getTextFieldProps()} />
        </GridItem>
      </Grid>
    </Grid>
  )
}

export default PersonalDetails
