'use client'
import React, { useState, ReactNode, useContext } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  TextField,
  MenuItem,
  Switch,
  InputAdornment,
  useTheme, // Import the useTheme hook
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WarningIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { paletteContext } from '@/contexts/paletteContext'
interface GridItemProps {
  label: string;
  select?: boolean;
  warning?: boolean; // Made optional
  children?: ReactNode; // Change to ReactNode to accept multiple children
}

const GridItem: React.FC<GridItemProps> = ({ label, warning, select = false, children = null, ...props }) => {

  return (
    <Grid item xs={6}>
      <TextField
        fullWidth
        select={select}
        label={label}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <>
              {warning && (
                <InputAdornment position="end">
                  <WarningIcon color="error" />
                </InputAdornment>
              )}
              {select && (
                <InputAdornment position="end">
                  <ArrowDropDownOutlinedIcon />
                </InputAdornment>
              )}
            </>
          ),
        }}
        {...props}
      >
        {children}
      </TextField>
    </Grid>
  );
};

const Form = () => {
  const [editMode, setEditMode] = useState(false);
  const theme = useTheme(); // Use the theme

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCloseClick = () => {
    setEditMode(false);
  };
  const palette = useContext(paletteContext)
  console.log(palette)
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '6px',
        padding: '50px 10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: '-10px',
          left: '18px',
          padding: '0 12px ',
          background: palette?.currentTheme?.dark?.palette?.background?.default,
          color: theme.palette.text.primary,
          fontSize: '18px',
        }}
      >
        حساب بنكي 1
      </Typography>

      {!editMode ? (
        <>
          <IconButton
            sx={{
              position: 'absolute',
              top: '-12px',
              right: '18px',
              background: palette?.currentTheme?.dark?.palette?.background?.default,
              fontSize: '18px',
              color: theme.palette.error.main,
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              top: '-12px',
              right: '50px',
              background:palette?.currentTheme?.dark?.palette?.background?.default,
              fontSize: '18px',
              color: theme.palette.common.white,
            }}
            onClick={handleEditClick}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: '-12px',
              right: '10px',
              background: palette?.currentTheme?.dark?.palette?.background?.default,
              fontSize: '18px',
              color: theme.palette.success.main,
            }}
            onClick={handleCloseClick}
          >
            <CheckOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              top: '-12px',
              right: '40px',
              background: palette?.currentTheme?.dark?.palette?.background?.default,
              color: theme.palette.error.main,
            }}
            onClick={handleCloseClick}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              top: '-12px',
              right: '70px',
              background: palette?.currentTheme?.dark?.palette?.background?.default, // Use theme for background color
            }}
            onClick={handleCloseClick}
          >
            <ArrowDropDownOutlinedIcon />
          </IconButton>
          <Typography
            sx={{
              position: 'absolute',
              top: '-12px',
              right: '100px',
              padding: '0 12px ',
              background: palette?.currentTheme?.dark?.palette?.background?.default, // Use theme for background color
              color: theme.palette.text.primary, // Use theme for text color
              fontSize: '14px',
              marginTop: "8px"
            }}
          >
            افتراضي
          </Typography>
          <Switch
            sx={{
              position: 'absolute',
              top: '-12px',
              right: '160px',
              background: palette?.currentTheme?.dark?.palette?.background?.default, // Use theme for background color
            }}
          />
        </Box>
      )}

      <Grid container spacing={2}>
        <GridItem label="دوله البنك" select warning>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </GridItem>

        <GridItem label="اسم البنك" select warning>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </GridItem>

        <GridItem label="الاسم الكامل لصاحب الحساب البنكي" warning />

        <GridItem label="عمله الحساب" select warning>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </GridItem>

        <GridItem label="رقم الحساب البنكي" warning />

        <GridItem label="IBAN" select warning>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </GridItem>

        <GridItem label="رمز SWIFT/BIC" warning />
      </Grid>
    </Box>
  );
};

export default Form;
