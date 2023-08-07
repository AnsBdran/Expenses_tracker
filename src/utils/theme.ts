import { createTheme, responsiveFontSizes } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: grey[800],
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
