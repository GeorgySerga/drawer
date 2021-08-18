import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import DeleteItemButton from './DeleteItemButton';
import { useAuthContext } from '../../providers/AuthProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '25px',
  },
  imageList: {
    width: '100%',
    maxWidth: 500,
    height: '70vh',
  },
  paperImageContainer: {
    padding: '10px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '380px',
    },
  },
}));

function TitlebarImageList() {
  const { user } = useAuthContext();
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/images', {
        credentials: 'include',
      });
      const json = await data.json();
      setData(json);
    })();
  }, []);

  const isPersonal = (username) => username === user?.username;
  const deleteImage = (index) =>
    setData([...data.slice(0, index), ...data.slice(index + 1)]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paperImageContainer}>
        <ImageList rowHeight={180} className={classes.imageList}>
          <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Drawings</ListSubheader>
          </ImageListItem>
          {data.map(({ image, id, username, date }, index) => (
            <ImageListItem key={image}>
              <img src={image} alt="Drawing" />
              <ImageListItemBar
                subtitle={
                  <span>
                    by: {username},<br />
                    uploaded: {new Date(date).toDateString()}
                  </span>
                }
                actionIcon={
                  isPersonal(username) && (
                    <DeleteItemButton
                      username={username}
                      id={id}
                      index={index}
                      deleteImage={deleteImage}
                    />
                  )
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </div>
  );
}

export default TitlebarImageList;
