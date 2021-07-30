import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" underline="always" href="https://jeetprajapati21.github.io/Portfolio/index.html">
        Jeet Prajapati
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    // backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
  link: {
    marginRight: '5px',
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg" align="center">
        <Link variant="body1" color="textSecondary" href="https://github.com/JeetPrajapati21">
          <GitHubIcon className={classes.link} />
        </Link>
        <Link variant="body1" color="textSecondary" href="https://www.instagram.com/jeetprajapati2107/">
         <InstagramIcon className={classes.link} />
        </Link>
        <Link variant="body1" color="textSecondary" href="https://www.facebook.com/jeetprjpt/">
          <FacebookIcon className={classes.link} />
        </Link>
        <Link variant="body1" color="textSecondary" href="https://www.linkedin.com/in/jeet-prajapati-b630b7174/">
          <LinkedInIcon className={classes.link} />
        </Link>
        <Copyright />
      </Container>
    </footer>
  );
}