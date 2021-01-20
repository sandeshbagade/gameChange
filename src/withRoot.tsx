/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#007EA7',
      main: '#1A76D2',
      dark: '#00171f',
      contrastText: '#484848',
    },
    background: {
      default: '#fff',
    },
    secondary: {
      light: '#ff5e50',
      main: '#3DB6EA',
      dark: '#a90000',
      contrastText: '#484848',
    },
  },
  typography: {
    fontFamily: ['Helvetica', 'Roboto'].join(','),
  },
});

export function withRoot(Component: any) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}
