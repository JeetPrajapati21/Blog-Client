import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, Container, FormControl, IconButton, Input, InputLabel, ListItemText, MenuItem, Select, Snackbar, TextField, Typography, useTheme } from '@material-ui/core';
import axios from 'axios';
import { useLocation } from 'react-router';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  write: {
    width: '100%',
  },
  heading: {
    padding: 10
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

export default function UpdatePost() {
  const classes = useStyles();

  const location = useLocation();
  const [post, setPost] = useState({});
  const path = location.pathname.split("/")[3];
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [file, setFile] = useState(null);
  const theme = useTheme();
  const [categoryName, setCategoryName] = React.useState([]);
  const PF = "https://blog-jeet.herokuapp.com/file/";

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const getPosts = async () => {
        const res = await axios.get(`https://blog-jeet.herokuapp.com/api/post/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategoryName(res.data.category);
    }
    getPosts();
  }, [path]);



  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };


  const handleSubmit = async () => {
    setOpen(true);

    const newPost = {
      title,
      content,
      category: categoryName,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("filename", filename);
      data.append("file", file);
      try {
        const imgUrl = await axios.post("https://blog-jeet.herokuapp.com/file/upload", data);
        newPost.photo = imgUrl.data;
      } catch (error) {
        console.log("not uploaded!");
      }
    }
    const post = await axios.put(`https://blog-jeet.herokuapp.com/api/post/${path}`, newPost);
    window.location.replace(`/post/${post.data._id}`);
  }

  return (
    <Container maxWidth="md" >
      <Typography variant="h5" align="center" className={classes.heading} >
          Update Post
      </Typography>
      {
        (post.photo || file)
        &&
        <img
          className={classes.image}
          src={ file ? URL.createObjectURL(file) : PF + post.photo}
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
          value={title}
          InputLabelProps={{shrink: true}}
          spellCheck={false}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField 
          label="Content" 
          className={classes.content} 
          multiline
          value={content}
          spellCheck={false}
          InputLabelProps={{shrink: true}}
          onChange={e => setContent(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit} >Update</Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Post has been updated!"
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
