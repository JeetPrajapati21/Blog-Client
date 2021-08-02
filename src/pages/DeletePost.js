import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

export default function DeletePost(props) {
  const [open, setOpen] = React.useState(false);
  const { post } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Post has been deleted!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
