import React from 'react';
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {

componentWillUnmount(){
  window.location.reload(false);
}

  render(){
    localStorage.removeItem('jwt'); 
    return(
      <Redirect to='/' />
    )
  }
}

export default Logout;
