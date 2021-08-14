import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useCanvas from '../hooks/useCanvas';

const Canvas = () => {
  const { Canvas } = useCanvas();
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6}>
        {Canvas}
      </Grid>
      <Grid item xs={6} container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={3}>Drawing related controls</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>CRUD</Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Canvas;
