import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useAuthContext } from '../providers/AuthProvider';

const useStyles = makeStyles(() => ({
  container: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: '5px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          return alert(await response.text());
        }
        const user = await response.json();
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        history.replace({
          pathname: '/',
        });
      })
      .catch(alert);
  };

  const register = () => {
    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          alert(await response.text());
        }
      })
      .catch(alert);
  };

  return (
    <Paper className={classes.container}>
      <form noValidate autoComplete="off">
        <div>
          <TextField
            className={classes.input}
            id="username"
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.input}
            id="password"
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button
            className={classes.input}
            variant="contained"
            color="primary"
            onClick={login}
          >
            Login
          </Button>
          <Button
            className={classes.input}
            variant="contained"
            color="primary"
            onClick={register}
          >
            Register
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Login;
