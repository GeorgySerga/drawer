import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LayersClearIcon from '@material-ui/icons/LayersClear';

const EraseControl = ({ context, save }) => {
  const handleChange = () => {
    const ctx = context.current;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    save();
  };
  return (
    <IconButton
      aria-label="Erase everything!"
      onClick={handleChange}
      title="Erase everything!"
    >
      <LayersClearIcon />
    </IconButton>
  );
};

export default EraseControl;
