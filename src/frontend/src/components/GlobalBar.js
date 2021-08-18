import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAuthContext } from '../providers/AuthProvider';
import Logout from './Logout';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'white',
    '&:visited': {
      color: 'white',
    },
  },
  bar: {
    marginBottom: '10px',
  },
});

export default function GlobalBar() {
  const classes = useStyles();
  const auth = useAuthContext();

  return (
    <AppBar position="static" className={classes.bar}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          className={classes.title}
          to="/"
        >
          Drawer
        </Typography>
        {auth.isAuthenticated() && (
          <Button color="inherit" component={Link} to="/draw">
            Draw
          </Button>
        )}
        {auth.isAuthenticated() ? (
          <Logout />
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
