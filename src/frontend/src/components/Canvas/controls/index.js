import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import LineWidthControl from './LineWidthControl';
import ColorControl from './ColorControl';
import EraseControl from './EraseControl';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
});

const CanvasControls = ({ context }) => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root}>
      <LineWidthControl context={context} />
      <ColorControl context={context} />
      <EraseControl context={context} />
    </Paper>
  );
};

export default CanvasControls;
