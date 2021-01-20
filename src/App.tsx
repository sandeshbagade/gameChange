import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Route, Router } from 'react-router-dom';
import { history } from './configureStore';
import { withRoot } from './withRoot';
import login from './login/login';
import dashboard from './dashboard/dashboard';
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    fontFamily: 'Helvetica !important',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100vh',
  },
}));
function Routes(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Route exact={true} path="/" component={login} />
      <Route exact={true} path="/dashboard/preview" component={dashboard} />
    </div>
  );
}

function App(): JSX.Element {
  const classes = useStyles();
  return (
    <Router history={history}>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Routes />
        </div>
      </div>
    </Router>
  );
}

export default withRoot(App);
