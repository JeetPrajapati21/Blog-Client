import React, { useCallback, useEffect, useRef, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import { Container } from '@material-ui/core';
import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Post from './pages/Post';
import UserPosts from './components/UserPosts';
import WritePost from './pages/WritePost';
import PostByCat from './components/PostByCat';
import Register from './pages/Register';
import Login from './pages/Login';
import UpdatePost from './pages/UpdatePost';
import axios from 'axios';
import { AuthContext } from './context/auth-context';
import UpdateUser from './pages/UpdateUser';

const mainFeaturedPost = {
  title: 'Blog is a place to write, read and connect',
  description:
    "It's easy and free to post your thinking on any topic and connect with millions of readers.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
};

let logoutTimer;

function App() {

  let state = useRef(JSON.parse(localStorage.getItem('blogUser')));

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'blogUser',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    state.current = JSON.parse(localStorage.getItem('blogUser'));

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('blogUser');
    let token = null;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    state.current = JSON.parse(localStorage.getItem('blogUser'));
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('blogUser'));
    
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" >
          <Router>
            <Header />
              <Switch >
                <Route path="/" exact>
                  <Home post={mainFeaturedPost} />
                </Route>
                <Route path="/post/:id" exact>
                  <Post />
                </Route>
                <Route path="/user=:id/posts" exact>
                  <UserPosts />
                </Route>
                <Route path="/category=:id" exact>
                  <PostByCat />
                </Route>
                <Route path="/register" exact>
                  <Register />
                </Route>
                <Route path="/login" exact>
                  <Login />
                </Route>
                {
                  state.current
                  ?
                  <Route path="/write" exact>
                    <WritePost />
                  </Route>
                  :
                  <Redirect to="/login" />
                }
                {
                  state.current
                  ?
                  <Route path="/post/edit/:id" exact>
                    <UpdatePost />
                  </Route>
                  :
                  <Redirect to="/login" />
                }
                {
                  state.current
                  ?
                  <Route path="/user/edit/:id" exact>
                    <UpdateUser />
                  </Route>
                  :
                  <Redirect to="/login" />
                }
              </Switch>
            <Footer />
          </Router>
        </Container>
      </React.Fragment>
    </AuthContext.Provider>
  );
}

export default App;
