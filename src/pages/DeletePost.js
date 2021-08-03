import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 100,
    color: '#fff',
  },
}));

export default function DeletePost(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { post } = props;

  const handleDelete = async () => {
    setOpen(true);
    try {
        await axios.delete(`https://blog-jeet.herokuapp.com/api/post/${post._id}`, {data: {username: post.username}});
        await axios.delete(`https://blog-jeet.herokuapp.com/file/${post.photo}`);
    } catch (error) {
        
    }
    window.location.replace("/");
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={handleDelete} color="secondary">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {
        open
        &&
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        }
    </div>
  );
}
