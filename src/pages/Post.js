import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainPost from '../components/MainPost';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(0.5),
    },
    image: {
      height: 400,
      objectFit: 'cover',
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
    },
}));

export default function Post() {
  const classes = useStyles();
  const location = useLocation();
  const [post, setPost] = useState({});
  const path = location.pathname.split("/")[2];
  const PF = "http://localhost:5000/file/";

  const [sidebar, setSideBar] = useState({
    title: "About",
    fullName: "",
    about: "",
    profilePhoto: "",
    facebook: "",
    instagram: "",
    github: "",
    linkedin: ""
  });

  useEffect(() => {
    const getPost = async () => {
        const res = await axios.get("/api/post/" + path);
        setPost(res.data);

        const userData = await axios.get(`/api/auth/${res.data.username}`);
        const user = userData.data.user;
        setSideBar({
          title: 'About',
          fullName: user.fullName,
          about: user.about,
          profilePhoto: user.profilePhoto,
          github: user.github,
          instagram: user.instagram,
          facebook: user.facebook,
          linkedin: user.linkedin
        })
    }
    getPost();
  }, [path]);

  return (
      <React.Fragment>
          <Grid container spacing={5} className={classes.mainGrid}>
            {
              post.photo
              &&
              <img className={classes.image} src={PF + post.photo} alt="blog-img" />
            }
            <MainPost post={post} />
            <SideBar
                sidebar={sidebar}
            />
          </Grid>
      </React.Fragment>
  )
}
