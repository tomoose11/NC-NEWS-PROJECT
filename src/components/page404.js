import React from 'react';

const Page404 = props => {
  if (props.location.state) {
    return (
      <div>
        <div style={{ fontSize: 100 }}>{props.location.state.err}</div>
      </div>
    );
  } else {
    return <div style={{ fontSize: 100 }}>page not found 404</div>;
  }
};

export default Page404;
