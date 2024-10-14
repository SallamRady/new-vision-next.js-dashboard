'use client';
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface EditRoleDialogProps {
  open: boolean;
  onClose: () => void;
}

const EditRoleDialog = ({ open, onClose }: EditRoleDialogProps) => {


  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">تعديل الدور</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="اسم الدور"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="المسؤوليات"
          fullWidth
        />
      </DialogContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditRoleDialog;
