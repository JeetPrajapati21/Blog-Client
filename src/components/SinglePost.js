import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Avatar, CardHeader } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const dateFormat = (inputDate) => {
  let options = { year: 'numeric', month: 'short', day: 'numeric' };
  let date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
}

export default function SinglePost(props) {
  const classes = useStyles();
  const { post } = props;
  const PF = "https://blog-jeet.herokuapp.com/file/";
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://blog-jeet.herokuapp.com/api/auth/${post.username}`);
      setUser(res.data.user.profilePhoto);
    };
    fetchUser();
  });

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/post/${post._id}`} >
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardHeader
              avatar={
                <Avatar alt="A" src={PF + user} className={classes.large}/>
              }
              title={post.title.substring(0, 50)}
              subheader={`${dateFormat(post.createdAt)} by ${post.username}`}
            />
            <CardContent>
              <Typography variant="subtitle1">
                {post.content.substring(0, 50)}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={PF + post.photo} title={post.imageTitle} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

SinglePost.propTypes = {
  post: PropTypes.object,
};
