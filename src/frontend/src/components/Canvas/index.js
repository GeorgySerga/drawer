import React from 'react';
import Grid from '@material-ui/core/Grid';
import useCanvas from '../../hooks/useCanvas';
import CanvasControls from './controls';

const Canvas = () => {
  const { Canvas, context, save } = useCanvas();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        {Canvas}
      </Grid>
      <Grid item xs={12} md={6}>
        <CanvasControls context={context} save={save} />
      </Grid>
    </Grid>
  );
};

export default Canvas;
