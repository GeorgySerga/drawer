import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import Popover from '@material-ui/core/Popover';
import Slider from '@material-ui/core/Slider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '30px 20px 0 20px',
  },
});

const LineWidthControl = ({ context }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleChange = (value) => {
    context.current.lineWidth = value;
  };

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton
        aria-label="Change line weight"
        onClick={openPopover}
        aria-describedby={id}
      >
        <LineWeightIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Card className={classes.root}>
          <CardContent>
            <Slider
              defaultValue={context.current?.lineWidth}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={3}
              marks
              min={2}
              max={23}
              onChange={(_, value) => handleChange(value)}
            />
            <Typography variant="h6" gutterBottom>
              Select pointer width value
            </Typography>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default LineWidthControl;
