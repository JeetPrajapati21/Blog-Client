import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

let blogUser =  JSON.parse(localStorage.getItem("blogUser"));
let token;
if(blogUser){
    token= blogUser.token;
}

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {     
//    console.log(request)
    return request;
}, error => {
  //  console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // Edit response config
    //console.log(response);
    return response;
}, error => {
    console.log(error.response);
    return Promise.reject(error);
});


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

