import { createMuiTheme } from '@material-ui/core/styles';

//https://material-ui.com/components/material-icons/ REFERENCIA ICONOS
// use default theme
// const theme = createMuiTheme();

// Or Create your Own theme:
const trendifyTheme = createMuiTheme({
  palette: {
    primary: {
        main: '#2064EC',
        dark: '#2D2D37',
        light: '#E2E3E4',
      },
    secondary: {
      main: '#0BCE64'
    },
    // error: {
    //   main: '#E33E7F'
    // },
    // warning: {
    //     main: '#FF5B64',
    //   },
    // info: {
    //     main: '#2064EC',
    //   },
    // success: {
    //   main: '#FF9F52'
    // }
  }
});

export default trendifyTheme;