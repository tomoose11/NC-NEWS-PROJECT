import React from 'react';
import Login from './Login';
import Header from './Header';
import Sidebar from './Sidebar';

const Auth = props => {
  if (props.user) {
    console.log(props.user);
    return <>{props.children}</>;
  } else {
    return (
      <>
        <Header />
        <nav style={{ backgroundColor: 'blue' }} />
        <Login findUser={props.findUser} />
        <Sidebar />
        <footer>footer</footer>
      </>
    );
  }
};

export default Auth;
