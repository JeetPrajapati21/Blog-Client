import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, Container, FormControl, IconButton, Input, InputLabel, ListItemText, MenuItem, Select, Snackbar, TextField, Typography, useTheme } from '@material-ui/core';
import axios from 'axios';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  write: {
    width: '100%',
  },
  heading: {
    padding: 10,
  },
  title: {
    display: 'flex',
    marginBottom: 20,
  },
  content: {
    display: 'flex',
    marginBottom: 20,
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  image: {
    height: 400,
    objectFit: 'cover',
    width: '100%',
  },
  addImage: {
    display: 'none',
    marginBottom: theme.spacing(1),
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Business',
  'Culture',
  'Design',
  'Health',
  'Politics',
  'Science',
  'Style',
  'Technology',
  'Travel',
  'Others'
];


function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function WritePost() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const theme = useTheme();
  const [categoryName, setCategoryName] = React.useState([]);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };


  const handleSubmit = async () => {
    setOpen(true);

    const storedData = JSON.parse(localStorage.getItem('blogUser'));
    const newPost = {
      userId: storedData.userId,
      title,
      content,
      category: categoryName
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("https://blog-jeet.herokuapp.com/api/upload", data);
      } catch (error) {
        console.log("not uploaded!");
      }
    }
    const post = await axios.post("https://blog-jeet.herokuapp.com/api/post", newPost);
    window.location.replace(`/post/${post.data._id}`);
  }

  return (
    <Container maxWidth="md" >
      <Typography variant="h5" align="center" className={classes.heading} >
        Write Post
      </Typography>
      {
        file 
        &&
        <img
          className={classes.image}
          src={URL.createObjectURL(file)}
          alt="blog"
        />
      }
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Category</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          value={categoryName}
          multiple
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, categoryName, theme)}>
              <Checkbox checked={categoryName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <form className={classes.write} >
        <label htmlFor="fileInput">
          <IconButton
              component="span"
          >
            <AddAPhotoIcon
                style={{
                    fontSize: 25,
                    color: "rgb(121, 118, 118)"
                }}
            />
          </IconButton>
        </label>
        <TextField 
          type="file"
          id="fileInput"
          className={classes.addImage}
          onChange={e => setFile(e.target.files[0])}
        />
        <TextField 
          label="Title" 
          className={classes.title} 
          multiline
          spellCheck={false}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <TextField 
          label="Content" 
          className={classes.content} 
          multiline
          spellCheck={false}
          onChange={e => setContent(e.target.value)}
          required
        />
        <Button variant="contained" onClick={handleSubmit} >Post</Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Post has been created!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}