import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SinglePost from './SinglePost';
import { useLocation } from 'react-router';

const useStyles = makeStyles({
    heading: {
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    }
  });

export default function UserPosts() {
    const classes = useStyles();

    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const path = location.pathname.split("/")[1].substring(5);
  
    useEffect(() => {
      const getPosts = async () => {
          const res = await axios.get(`/api/user/?user=${path}`);
          setPosts(res.data);
      }
      getPosts();
    }, [path]);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h5" className={classes.heading}>
                Posts by {path}
            </Typography>
            <Grid container spacing={4}>
                {posts.map((post, index) => {
                    return <SinglePost key={index} post={post} />
                })}
            </Grid>
        </React.Fragment>
    )
}
