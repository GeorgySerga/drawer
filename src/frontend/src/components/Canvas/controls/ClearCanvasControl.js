import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LayersClearIcon from '@material-ui/icons/LayersClear';

const ClearCanvasControl = ({ context, save }) => {
  const handleChange = () => {
    const ctx = context.current;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    save();
  };
  return (
    <IconButton
      aria-label="Clear canvas"
      onClick={handleChange}
      title="Clear canvas"
    >
      <LayersClearIcon />
    </IconButton>
  );
};

export default ClearCanvasControl;
