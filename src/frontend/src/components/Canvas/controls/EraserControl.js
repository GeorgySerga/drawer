import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Eraser } from './icons/eraser.svg';

const EraserControl = ({ context }) => {
  const handleChange = () => {
    context.current.strokeStyle = '#FFFFFF';
  };
  return (
    <IconButton
      aria-label="Use eraser"
      onClick={handleChange}
      title="Use eraser"
    >
      <SvgIcon>
        <Eraser />
      </SvgIcon>
    </IconButton>
  );
};

export default EraserControl;
