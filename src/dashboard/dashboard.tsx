/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { Route, Switch, useLocation } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AnalysisIcon from '@material-ui/icons/Notes';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import HelpOutline from '@material-ui/icons/HelpOutline';
import LayersIcon from '@material-ui/icons/Layers';
import { useActions } from '../actions';
import * as AuthActions from '../actions/auth';
import { history } from '../configureStore';
import { useSelector } from 'react-redux';
import { storeState } from '../model';
import CanvasDraw from 'react-canvas-draw';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#EEEEEE',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    backgroundColor: '#212121',
  },
  activeClass: {
    backgroundColor: '#0C0C0C',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  customButton: {
    borderRadius: 5,
    backgroundColor: '#3DB6EA',
    color: '#fff',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#2e8ab2',
    },
  },
  NoDisplay: {
    display: 'none',
  },
  dataPolicyContainer: {
    width: '520px',
    padding: '10px 10px',
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 'calc(100% - 520px)',
  },
}));

export default function Dashboard(): JSX.Element {
  const store = useSelector((state: storeState) => state);
  const classes = useStyles();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nav, setNav] = React.useState<{ status: string }>({ status: location.pathname });
  const [highlight, setHighlight] = React.useState<boolean>(false);

  const authActions = useActions(AuthActions);
  const logoutReq = (): void => {
    authActions.userLogout();
  };
  const handleActive = async (str: string): Promise<void> => {
    history.push(str);
  };
  return (
    <div>
      <CssBaseline />
      <main className={classes.content}>
        <div />
        <Drawer variant="permanent" classes={{ paper: classes.paper }}>
          <List style={{ width: '250px', color: '#fff' }}>
            <ListItem
              button
              className={nav.status === '/dashboard/preview' ? classes.activeClass : ''}
              onClick={(): Promise<void> => handleActive('/dashboard/preview')}
              data-test-id="preview"
            >
              <DashboardIcon style={{ padding: '0 0 0 5px', color: '#707070' }} />
              <Typography variant="subtitle1" component="p" style={{ padding: '0 0 0 15px' }}>
                Preview
              </Typography>
            </ListItem>
          </List>
          <List style={{ width: '250px', color: '#fff', position: 'absolute', bottom: 0 }}>
            <ListItem button onClick={logoutReq}>
              <span style={{ marginLeft: '5px' }}> {'  '}</span>
              <LogoutIcon style={{ padding: '0 0 5px 5px', color: '#707070', transform: 'rotate(-180deg)' }} />
              <Typography variant="subtitle1" component="p" style={{ padding: '10px 0 0 10px' }}>
                Logout
              </Typography>
            </ListItem>
            <ListItem>
              <span style={{ marginTop: '5px' }}> {'  '}</span>
              <LayersIcon style={{ padding: '0 0 0 5px', color: '#707070' }} />
              <Typography variant="subtitle1" component="p" style={{ padding: '5px 0 0 15px' }}>
                Version 0.1.1
              </Typography>
            </ListItem>
          </List>
        </Drawer>
        <div style={{ margin: '50px 100px 100px  350px' }}>
          <Switch>
            <Route path="/dashboard/preview">
              <CanvasDraw
                brushColor="rgba(155,12,60,0.3)"
                imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg"
                disabled={highlight}
              />
              <Button
                variant="contained"
                disableElevation
                onClick={() => setHighlight(!highlight)}
                className={classes.customButton}
                style={{ marginBottom: '30px' }}
                data-test-id="loginButton"
              >
                <Typography variant="h6" component="p">
                  <span style={{ textTransform: 'capitalize', padding: '2px 5px 0 5px' }}>
                    {highlight ? 'Enable' : 'Disbale'}
                  </span>
                </Typography>
              </Button>
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}
