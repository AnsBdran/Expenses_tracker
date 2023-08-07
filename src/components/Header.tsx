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
import { Link, useNavigate } from 'react-router-dom';
import { clearExpenses } from '../features/expenses/expensesSlice';
import { clearBudgets } from '../features/budgets/budgetsSlice';

const Header = () => {
  const name = useSelector<RootState>((state) => state.user.name) as string;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    closeMenu();
    dispatch(signOut());
    navigate('/');
  };

  const handleClearData = () => {
    closeMenu();
    dispatch(clearExpenses());
    dispatch(clearBudgets());
  };
  return (
    <AppBar position='sticky' sx={{ bgcolor: 'secondary.dark' }}>
      <Container>
        <Stack direction='row' justifyContent='space-between' py={1.5}>
          <Stack
            component={Link}
            to='/'
            direction='row'
            alignItems='center'
            gap={0.5}
            sx={{ color: 'whitesmoke', textDecorationLine: 'none' }}
          >
            <PaymentsIcon />
            <Typography variant='h6'>Budgets tracker</Typography>
          </Stack>
          {name ? (
            <Avatar
              onClick={openMenu}
              color='secondary.main'
              sx={{ cursor: 'pointer', bgcolor: 'primary.light' }}
            >
              {name.slice(0, 1).toUpperCase()}
            </Avatar>
          ) : (
            ''
          )}
        </Stack>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenu}>
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          <MenuItem onClick={handleClearData}>Clear all data</MenuItem>
        </Menu>
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
