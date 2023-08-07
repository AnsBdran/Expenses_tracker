import { Box, Stack, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        mt: 'auto',
        bgcolor: 'secondary.dark',
        color: 'white',
        p: 4,
      }}
    >
      <Box maxWidth='lg' mx='auto'>
        <Stack justifyContent='center' alignItems='center'>
          <Typography>Budgets tracker</Typography>
          <Typography>Made with ❤️ By Anas Badran</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
