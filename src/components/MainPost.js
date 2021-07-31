import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import DeletePost from '../pages/DeletePost';
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

export default function MainPost(props) {
  
  const { post } = props;
  const storedData = JSON.parse(localStorage.getItem('blogUser'));

  const dateFormat = (inputDate) => {
    let options = { year: 'numeric', month: 'short', day: 'numeric' };
    let date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  }
  const [id, setId] = useState("");

  useEffect(() => {
    const getId = async () => {
      const res = await axios.get(`https://blog-jeet.herokuapp.com/api/auth/${post.username}`);
      const user = res.data.user;
      if (user) {
        setId(user._id);
      } 
    };
    getId();
  }, [post]);

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Created at: 
        {dateFormat(post.createdAt)} <t />
        Updated at: 
        {dateFormat(post.updatedAt)} by 
        <Link color="inherit" to={`/user=${post.username}/posts`} style={{marginLeft: 5, marginRight: 5, color: '#1976d2'}}>
          {post.username}
        </Link>
      </Typography>
      <Typography variant="subtitle2" noWrap>
        Category:
          {
            post.category
            &&
            post.category.map(cat => {
              return (
                <Link color="inherit" to={`/category=${cat}`} style={{marginLeft: 5, color: '#1976d2'}}>
                  {cat}
                </Link>
              )
            })
          }
      </Typography>
      <Typography style={{position: 'relative'}}>
        {
          (storedData && storedData.userId === id) 
          &&
          <DeletePost post={post} />
        }
        {
          (storedData && storedData.userId === id) 
          &&
          <Tooltip title="Edit">
            <IconButton color="primary" href={`/post/edit/${post._id}`} style={{position: 'absolute', top: 0, left: 50}}>
              <EditIcon style={{color: '#1976d2'}}/>
            </IconButton>
          </Tooltip>
        }
      </Typography>
      <Typography variant="body1" >
        {post.content}
      </Typography>
    </Grid>
  );
}

MainPost.propTypes = {
  posts: PropTypes.string,
  title: PropTypes.string,
};