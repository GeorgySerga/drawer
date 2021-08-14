import React, { useState } from 'react';
import { Box } from '@material-ui/core';

const ColorControl = ({ context }) => {
  const [color, setColor] = useState(context.current?.strokeStyle);

  const handleOnClick = () => {
    context.current.strokeStyle = color;
  };

  const handleChange = ({ target: { value } }) => {
    setColor(value);
    context.current.strokeStyle = value;
  };
  return (
    <Box display="inline-block" marginRight="5px" marginLeft="5px">
      <input
        name="Color picker"
        type="color"
        value={color}
        onChange={handleChange}
        onClick={handleOnClick}
      />
    </Box>
  );
};

export default ColorControl;
