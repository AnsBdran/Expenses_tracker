import {
  AppBar,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useState } from 'react';
import { signOut } from '../features/user/userSlice';
const Header = () => {
  const name = useSelector<RootState>((state) => state.user.name);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();

  const openMenu = (e) => {
    setAnchorEl(e.target);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    closeMenu();
    dispatch(signOut());
  };

  return (
    <AppBar position='sticky'>
      <Container>
        <Stack direction='row' justifyContent='space-between' py={0.5}>
          <Stack direction='row' alignItems='center' gap={0.5}>
            <PaymentsIcon />
            <Typography variant='h6'>Budget</Typography>
          </Stack>
          {name ? (
            <Avatar onClick={openMenu} color='error' sx={{ cursor: 'pointer' }}>
              {name.slice(0, 1).toUpperCase()}
            </Avatar>
          ) : (
            ''
          )}
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closeMenu}
          >
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
        </Stack>
      </Container>
    </AppBar>
  );
};

// const Header = () => {
//   return (
//     <Box component='header' sx={{}}>
//       <Container>
//         <Stack justifyContent='space-between' direction='row'>
//           <Typography variant='h6'>Home Budget</Typography>
//           <ButtonGroup
//             variant='text'
//             color='secondary'
//             sx={{ color: 'secondary' }}
//           >
//             <Button>Dashboard</Button>
//             <Button>Budgets</Button>
//             <Button>Expenses</Button>
//           </ButtonGroup>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

export default Header;
