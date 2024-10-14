import { Box, Stack } from '@mui/material';
import CardRoles from './Card/CardRoles';
import TopSection from './TopSection/TopSection';

export interface Permission {
  id: number;
  name: string;
  guard_name?: string;
  label?: string;
}

export interface Rolee {
  id: number;
  name: string;
  guard_name: string;
  created_at?: string;
  permissions: Permission[];
}

interface RolesProps {
  roles: Rolee[];
}

// Client component
const Roles = ({ roles }: RolesProps) => {
  return (
    <Box>
      <TopSection />
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ flexWrap: 'wrap' }}>
        {roles.map((role) => (
          <Stack key={role.id} sx={{ width: { xs: '100%', sm: '50%', md: '30%' } }}>
            <CardRoles role={role} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Roles;
