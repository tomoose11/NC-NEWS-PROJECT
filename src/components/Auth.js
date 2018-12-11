import React from 'react';
import Login from './Login';
import Header from './Header';

const Auth = props => {
  if (props.user) {
    return <>{props.children}</>;
  } else {
    return (
      <>
        <Header />
        <Login findUser={props.findUser} />
      </>
    );
  }
};

export default Auth;
