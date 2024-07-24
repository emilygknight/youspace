import { createTheme } from '@mui/material/styles';

// Defining the theme for MUI components
const theme = createTheme({
  palette: {
    primary: {
      light: '#fab950',
      main: '#f9a825',
      dark: '#ae7519',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffefc2',
      main: '#ffecb3',
      dark: '#b2a57d',
      contrastText: '#000',
    },
  },
});

export default theme;