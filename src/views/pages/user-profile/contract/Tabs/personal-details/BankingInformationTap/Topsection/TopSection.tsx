import { Button, Stack, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


function TopScection() {
  return (
    <>
      <Stack sx={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: "18px"}}>
        <Typography  component="span" sx={{fontSize: "18px", color: "white"}}>
            البيانات البنكيه
          </Typography>
          <Button sx={{background: "var(--mui-palette-primary-main)", width: "150px", height: "35px", color: "white"}} startIcon={<AddIcon/>}>
            اضافه حقل جديد
          </Button>
      </Stack>
    </>
  )
}

export default TopScection
