import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const DeleteItemButton = ({ username: user, id, index, deleteImage }) => {
  const classes = useStyles();
  const deleteItem = () => {
    fetch('/api/images', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
        user,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => deleteImage(index));
  };
  return (
    <IconButton
      aria-label={`info about ${user}'s work`}
      className={classes.icon}
      onClick={deleteItem}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteItemButton;
