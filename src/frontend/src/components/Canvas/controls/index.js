import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import LineWidthControl from './LineWidthControl';
import ColorControl from './ColorControl';
import ClearCanvasControl from './ClearCanvasControl';
import EraserControl from './EraserControl';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '320px',
  },
});

const CanvasControls = ({ context, save }) => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root}>
      <LineWidthControl context={context} />
      <EraserControl context={context} />
      <ColorControl context={context} />
      <ClearCanvasControl context={context} save={save} />
    </Paper>
  );
};

export default CanvasControls;
