import { Typography, TextField, Button, Stack, Box } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { StaticsChart } from '../svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { signIn } from '../features/user/userSlice';

// type IntroPropsType = {
//   setUserName: (name: string) => void;
// };

const Intro = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    dispatch(signIn(name));
    navigate('/dashboard');
  };

  return (
    <>
      {/* <h2>Hello intro</h2> */}
      <Stack sx={{ p: 2 }} direction={{ sm: 'column', md: 'row' }} gap={4}>
        <Box>
          <Typography variant='h1' gutterBottom>
            Take control of <br />
            <Typography
              variant='h1'
              fontWeight='bold'
              color='primary.main'
              component='span'
            >
              your money
            </Typography>
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            Personal budgeting is the secret to financial freedom. Start your
            journey today.
          </Typography>
          <Stack spacing={2}>
            <TextField
              variant='outlined'
              size='small'
              label='Name'
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant='contained'
              size='large'
              endIcon={<PersonAddAltIcon />}
              onClick={() => handleSignIn()}
            >
              Create Account
            </Button>
          </Stack>
        </Box>
        <StaticsChart />
      </Stack>
    </>
  );
};

export default Intro;
