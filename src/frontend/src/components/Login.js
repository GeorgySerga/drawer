import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    margin: '0 5px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
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
      .then(console.log)
      .catch(console.error);
  };

  return (
    <Paper className={classes.container}>
      <form noValidate autoComplete="off">
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
        <Button variant="contained" color="primary" onClick={submit}>
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
