import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/auth-context';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 100,
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  backtop: {
    marginTop: -50,
  }
}));

const categories = [
  'Business', 
  'Culture',
  'Design',
  'Health',
  'Politics',
  'Science',
  'Style',
  'Technology',
  'Travel',
  'Others',
];

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Header(props) {
  const classes = useStyles();

  const auth = useContext(AuthContext);

  let storedData = JSON.parse(localStorage.getItem('blogUser'));
  
  const handleClick = () => {
    auth.logout();
    storedData = JSON.parse(localStorage.getItem('blogUser'));
  };
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar} id="back-to-top-anchor" >
        <Typography
          component="h2"
          variant="h5"
          noWrap
          color="inherit"
          className={classes.toolbarTitle}
        >
          Blog
        </Typography>
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
        <Button size="small" href="/">Home</Button>
        {
          storedData 
          &&
          <Button size="small" href="/write" >Write</Button>
        }
        {
          storedData 
          &&
          <Button size="small" href={`/user/edit/${storedData.userId}`} >Settings</Button>
        }
        {
          storedData 
          ?
          <Button size="small" href="/" onClick={handleClick} >Logout</Button>
          :
          <Button size="small" href="/login" >Login</Button>
        }
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {categories.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section}
            variant="body2"
            href={`/category=${section}`}
            className={classes.toolbarLink}
          >
            {section}
          </Link>
        ))}
      </Toolbar>
      <ScrollTop {...props}>
        <Fab color="inherit" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
