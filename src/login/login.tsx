import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import * as React from 'react';
import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import { useActions } from '../actions';
import * as AuthActions from '../actions/auth';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const useStyles = makeStyles({
  customButton: {
    borderRadius: 5,
    backgroundColor: '#3DB6EA',
    color: '#fff',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#2e8ab2',
    },
  },
  passwordResetLink: {
    cursor: 'pointer',
    color: '#909090',
    '&:hover': {
      textDecoration: 'underline',
      color: '#777777',
    },
  },
  root: {
    '& .MuiTextField-root': {
      margin: '10px',
      width: '25ch',
    },
  },
  formControl: {
    margin: '10px',
    minWidth: 120,
    maxWidth: 300,
  },
});

export default function HomePage(): React.ReactElement {
  const classes = useStyles();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };
  const authActions = useActions(AuthActions);
  const loginReq = (): void => {
    if (!username || 0 === username.length) authActions.showAlert('Username is empty');
    else if (!password || 0 === password.length) authActions.showAlert('Password is empty');
    else authActions.userLogin(username, password);
  };
  const loginReqEnter = (event: any): void => {
    if (event.key === 'Enter') loginReq();
  };
  React.useEffect(() => {
    window.addEventListener('keypress', loginReqEnter);
    return () => {
      window.removeEventListener('keypress', loginReqEnter);
    };
  }, [loginReqEnter]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [value, setValue] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChangePerson = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };
  return (
    <div>
      <div style={{ textAlign: 'center', padding: 20 }}>
        <div style={{ color: '#333333', fontFamily: 'Helvetica Neue' }}>
          <span style={{ fontSize: 24 }}>Game Change</span>
        </div>
      </div>

      <form noValidate autoComplete="off" className={classes.root} style={{ textAlign: 'center' }}>
        <div>
          <TextField required id="outlined-required" label="Required" defaultValue="Hello World" variant="outlined" />
          <TextField disabled id="outlined-disabled" label="Disabled" defaultValue="Hello World" variant="outlined" />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
            variant="outlined"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={personName}
              onChange={handleChangePerson}
              input={<Input />}
              renderValue={(selected) => (selected as string[]).join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Typography variant="h6" component="p" style={{ padding: '20px 0', marginBottom: '-10px' }}>
          Username
        </Typography>
        <TextField
          type="text"
          value={username}
          id="username"
          data-test-id="username"
          onChange={onChangeUsername}
          variant="outlined"
          size="small"
          style={{ color: '#000' }}
          autoFocus={true}
        />
        <Typography variant="h6" component="p" style={{ padding: '20px 0', marginBottom: '-15px' }}>
          Password
        </Typography>
        <TextField
          type="password"
          id="password"
          data-test-id="password"
          value={password}
          onChange={onChangePassword}
          variant="outlined"
          size="small"
        />
        <br />
        <br />
        <Button
          variant="contained"
          disableElevation
          onClick={loginReq}
          onKeyPress={loginReq}
          className={classes.customButton}
          style={{ marginBottom: '30px' }}
          data-test-id="loginButton"
        >
          <Typography variant="h6" component="p">
            <span style={{ textTransform: 'capitalize', padding: '2px 5px 0 5px' }}>Login</span>
          </Typography>
        </Button>
        <br />
        <br />
        <Typography
          variant="subtitle2"
          component="span"
          onClick={(): void => authActions.showAlert('Email us to request password reset')}
        >
          <span className={classes.passwordResetLink}>Request password reset</span>
        </Typography>
      </form>
    </div>
  );
}
