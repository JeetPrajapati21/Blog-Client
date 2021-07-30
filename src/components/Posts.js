import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SinglePost from './SinglePost';

export default function Posts() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axios.get("/api/post/");
        setPosts(res.data);
      };
      fetchPosts();
    }, [posts]);

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                {posts.map((post, index) => {
                    return <SinglePost key={index} post={post} />
                })}
            </Grid>
        </React.Fragment>
    )
}
