import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import image from './logo512.png';

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
  },
}));

const itemData = [
  {
    img: image,
    title: 'Image',
    author: 'author',
  },
  {
    img: image,
    title: 'Image1',
    author: 'author1',
  },
  {
    img: image,
    title: 'Image2',
    author: 'author2',
  },
  {
    img: image,
    title: 'Image3',
    author: 'author3',
  },
  {
    img: image,
    title: 'Image4',
    author: 'author4',
  },
  {
    img: image,
    title: 'Image5',
    author: 'author5',
  },
  {
    img: image,
    title: 'Image6',
    author: 'author6',
  },
  {
    img: image,
    title: 'Image7',
    author: 'author7',
  },
  {
    img: image,
    title: 'Image8',
    author: 'author8',
  },
];
function TitlebarImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paperImageContainer}>
        <ImageList rowHeight={180} className={classes.imageList}>
          <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Public drawings</ListSubheader>
          </ImageListItem>
          {itemData.map((item) => (
            <ImageListItem key={item.img + item.title}>
              <img src={item.img} alt={item.title} />
              <ImageListItemBar
                title={item.title}
                subtitle={<span>by: {item.author}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${item.title}`}
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
