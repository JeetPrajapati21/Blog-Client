import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const dateFormat = (inputDate) => {
  let options = { year: 'numeric', month: 'short', day: 'numeric' };
  let date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
}

export default function SinglePost(props) {
  const classes = useStyles();
  const { post } = props;
  const PF = "https://blog-jeet.herokuapp.com/file/";

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/post/${post._id}`} >
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title.substring(0, 30)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {dateFormat(post.createdAt)} by {post.username}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.content.substring(0, 40)}
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
