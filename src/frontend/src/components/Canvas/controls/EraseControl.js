import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LayersClearIcon from '@material-ui/icons/LayersClear';

const EraseControl = ({ context }) => {
  const handleChange = () => {
    const ctx = context.current;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };
  return (
    <IconButton aria-label="Erase everything" onClick={handleChange}>
      <LayersClearIcon />
    </IconButton>
  );
};

export default EraseControl;
