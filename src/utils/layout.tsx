import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { Box, Paper, Stack } from '@mui/material';

const Layout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box
        component='main'
        sx={{ px: 2, py: 4 }}
        width='100%'
        maxWidth='lg'
        mx='auto'
      >
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
