import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SinglePost from './SinglePost';
import { useLocation } from 'react-router';
import HomeSkeleton from './HomeSkeleton';

const useStyles = makeStyles({
    heading: {
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    }
  });

export default function PostByCat() {
    const classes = useStyles();

    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const path = location.pathname.split("/")[1].substring(9);
  
    useEffect(() => {
        setTimeout(() => {
            const getPosts = async () => {
                const res = await axios.get(`https://blog-jeet.herokuapp.com/api/user/${path}`);
                setPosts(res.data);
                setIsLoading(false);
            }
            getPosts();
        }, 2000)
    }, [path]);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h5" className={classes.heading}>
                Category: {path}
            </Typography>
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
