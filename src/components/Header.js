import React from 'react';
import { Link } from '@reach/router';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const Header = () => {
  return (
    <>
      <header
        className="header"
        style={{ textAlign: 'left', lineHeight: '1.6', paddingLeft: '10%' }}
      >
        <Link to="/" style={{ textDecoration: 'none', outline: 'none' }}>
          <header className="header">NC NEWS</header>
        </Link>
      </header>
    </>
  );
};

export default Header;
