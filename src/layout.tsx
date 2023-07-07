import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

const Layout = () => {
  return (
    <Stack justifyContent='space-between' direction='column' minHeight='100vh'>
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default Layout;
