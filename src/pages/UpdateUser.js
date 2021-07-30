import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, IconButton, Snackbar, TextField, Typography } from '@material-ui/core';
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
  image: {
    height: 400,
    objectFit: 'cover',
    width: '100%',
  },
  addImage: {
    display: 'none',
    marginBottom: theme.spacing(1),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function UpdateUser() {
  const classes = useStyles();

  const location = useLocation();
  const [user, setUser] = useState({});
  const path = location.pathname.split("/")[3];
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const PF = "https://blog-jeet.herokuapp.com/images/";
  const [file, setFile] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
        const res = await axios.get(`/api/auth/?userId=${path}`);
        setUser(res.data.user);
        setFullName(res.data.user.fullName);
        setAbout(res.data.user.about);
        setInstagram(res.data.user.instagram);
        setFacebook(res.data.user.facebook);
        setLinkedin(res.data.user.linkedin);
        setGithub(res.data.user.github);
    }
    getUser();
  }, [path]);


  const handleSubmit = async () => {
    setOpen(true);

    const updatedUser = {
      userId: user._id,
      fullName,
      about,
      instagram,
      facebook,
      github,
      linkedin,
    };
    if (password) {
      updatedUser.password = password;
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePhoto = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (error) {
        console.log("not uploaded!");
      }
    }
    await axios.put(`/api/user/${path}`, updatedUser);
    window.location.replace("/");
  }

  return (
    <Container maxWidth="md" >
      <Typography variant="h5" align="center" className={classes.heading} >
          Update Profile
      </Typography>
      {
        (user.profilePhoto || file)
        &&
        <Avatar 
          alt="Remy Sharp" 
          src={ file ? URL.createObjectURL(file) : PF + user.profilePhoto}
          className={classes.large} 
        />
      }
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
          label="Full Name" 
          className={classes.title} 
          value={fullName}
          spellCheck={false}
          multiline
          onChange={e => setFullName(e.target.value)}
          autoFocus
        />
        <TextField 
          label="Password" 
          className={classes.content} 
          InputLabelProps={{shrink: true}}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <TextField 
          label="About" 
          className={classes.title} 
          value={about}
          multiline
          spellCheck={false}
          onChange={e => setAbout(e.target.value)}
        />
        <TextField 
          label="Github Username" 
          className={classes.title} 
          value={github}
          spellCheck={false}
          onChange={e => setGithub(e.target.value)}
        />
        <TextField 
          label="Instagram Username" 
          className={classes.title} 
          spellCheck={false}
          value={instagram}
          onChange={e => setInstagram(e.target.value)}
        />
        <TextField 
          label="Facebook Username" 
          className={classes.title} 
          value={facebook}
          spellCheck={false}
          onChange={e => setFacebook(e.target.value)}
        />
        <TextField 
          label="Linkedin Username" 
          className={classes.title} 
          value={linkedin}
          spellCheck={false}
          onChange={e => setLinkedin(e.target.value)}
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
        message="User has been updated!"
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