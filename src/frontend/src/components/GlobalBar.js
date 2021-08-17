import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
        <Button color="inherit" component={Link} to="/draw">
          Draw
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
