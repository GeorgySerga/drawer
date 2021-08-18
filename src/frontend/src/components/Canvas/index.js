import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { useAuthContext } from '../../providers/AuthProvider';
import useCanvas from '../../hooks/useCanvas';
import CanvasControls from './controls';

const useStyles = makeStyles({
  gridItem: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    margin: '0 10px 30px 10px',
  },
});

const Canvas = () => {
  const { Canvas, context, save } = useCanvas();
  const auth = useAuthContext();
  const [isPrivateUpload, setIsPrivateUpload] = useState(false);
  const classes = useStyles();

  const handleIsPrivateUploadChange = (e) => {
    setIsPrivateUpload(!isPrivateUpload);
  };

  function onClick() {
    fetch('/api/images', {
      method: 'POST',
      body: JSON.stringify({
        private: isPrivateUpload,
        user: auth.user.username,
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
      {auth.isAuthenticated() && (
        <Grid item xs={12} md={6} className={classes.gridItem} container>
          <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            className={classes.input}
          >
            Upload
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={isPrivateUpload}
                onChange={handleIsPrivateUploadChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Private"
            className={classes.input}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Canvas;
