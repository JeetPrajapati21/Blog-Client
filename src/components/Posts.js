import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SinglePost from './SinglePost';
import HomeSkeleton from './HomeSkeleton';

export default function Posts() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const fetchPosts = async () => {
              const res = await axios.get("https://blog-jeet.herokuapp.com/api/post/");
              setPosts(res.data);
              setIsLoading(false);
            };
            fetchPosts();
        }, 2000);
    }, [posts]);

    return (
        <React.Fragment>
            {
                isLoading
                ?
                <Grid container spacing={4}>
                   { 
                    [...Array(4)].map(() => {
                            return <HomeSkeleton />
                        })
                    }
                </Grid>
                :
                <Grid container spacing={4}>
                    {posts.map((post, index) => {
                        return <SinglePost key={index} post={post} />
                    })}
                </Grid>
            }
        </React.Fragment>
    )
}
