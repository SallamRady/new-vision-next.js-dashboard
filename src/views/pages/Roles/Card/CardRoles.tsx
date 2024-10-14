"use client"
import { Box, Card, CardContent, Divider, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useState } from 'react';
import EditRoleDialog from '../EditDiloge/EditDiloge'; // Adjust the import path as needed
import { Rolee } from '../index'; // Adjust the import path as necessary


interface CardRolesProps {
  role: Rolee;
}

function CardRoles({ role }: CardRolesProps) { // Accept role as prop
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Card sx={{ width: '315px', margin: '12px' }}>
      <CardContent>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1'>الدور</Typography>
          <IconButton aria-label='edit role' onClick={handleOpenDialog}>
            <BorderColorOutlinedIcon />
          </IconButton>
        </Stack>

        <Box>
          <Typography variant='h2' sx={{ fontSize: '2rem', mb: 1 }}>
            {role.name} {/* Use role data from props */}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant='body1'>المسؤوليات</Typography>
          <List sx={{ listStyleType: 'disc', pl: 2 }}>
            {role.permissions.map((permission) => (
              <ListItem key={permission.id} sx={{ display: 'list-item', paddingLeft: 0 }}>
                <Typography variant='body1' color='white'>
                  {permission.label}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>

      <EditRoleDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Card>
  );
}

export default CardRoles;
