import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useCanvas from '../../hooks/useCanvas';
import CanvasControls from './controls';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  gridItem: {
    marginBottom: '10px',
  },
});

const Canvas = () => {
  const { Canvas, context, save } = useCanvas();
  const classes = useStyles();

  function onClick() {
    fetch('http://localhost:3001/api/images', {
      method: 'POST',
      body: JSON.stringify({
        private: false,
        user: 'test',
        image: context.current.canvas.toDataURL(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={6} className={classes.gridItem}>
        {Canvas}
      </Grid>
      <Grid item xs={12} md={6} className={classes.gridItem}>
        <CanvasControls context={context} save={save} />
      </Grid>
      <Grid item xs={12} md={6} className={classes.gridItem}>
        <Button variant="contained" color="primary" onClick={onClick}>
          Upload
        </Button>
      </Grid>
    </Grid>
  );
};

export default Canvas;
