import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const EraserControl = ({ context }) => {
  const handleChange = () => {
    context.current.strokeStyle = '#FFFFFF';
  };
  return (
    <IconButton aria-label="Go back" onClick={handleChange}>
      <HighlightOffIcon />
    </IconButton>
  );
};

export default EraserControl;
