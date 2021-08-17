import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';

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
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  paperImageContainer: {
    padding: '10px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '380px',
    },
  },
}));

function TitlebarImageList() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/images', { credentials: 'include' });
      const json = await data.json();
      setData(json);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paperImageContainer}>
        <ImageList rowHeight={180} className={classes.imageList}>
          <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Public drawings</ListSubheader>
          </ImageListItem>
          {data.map((item) => (
            <ImageListItem key={item.image}>
              <img src={item.image} alt="Public drawing" />
              <ImageListItemBar
                subtitle={<span>by: {item.username}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${item.username}'s work`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
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
