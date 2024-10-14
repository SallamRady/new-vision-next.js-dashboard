// TopSection.tsx
'use client'; // Mark this file as a Client Component

import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import EditTap from "../AddDiloge/AddDiloge"; // Adjust the import path accordingly

function TopSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" m={3}>
      <Box>
        <Typography variant="h2" sx={{ fontSize: "2rem", mb: 1 }}>
          قائمة الأدوار
        </Typography>
        <Typography variant="body1">
          دور يوفر إمكانية الوصول إلى القوائم والميزات المحددة مسبقًا بحيث يمكن للمسؤول، بناءً على الدور المخصص له، الوصول إلى ما يحتاج إليه
        </Typography>
      </Box>
      <Button
        sx={{
          background: "var(--mui-palette-primary-main)",
          width: "150px",
          height: "35px",
          color: "white"
        }}
        onClick={handleOpenModal} // Open modal on button click
      >
        اضافه حقل جديد
      </Button>

      <EditTap open={modalOpen} onClose={handleCloseModal} />
    </Stack>
  );
}

export default TopSection;
