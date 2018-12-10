import React from 'react';
import { Link } from '@reach/router';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

class Navbar extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { topics } = this.props;
    if (topics.length > 0) {
      return (
        <nav>
          <div
            className={styles.root}
            style={{ width: '100%', height: '100%' }}
          >
            <AppBar position="static">
              <Toolbar style={{ justifyContent: 'flex-end' }}>
                <div>
                  <Button
                    aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={{
                      color: 'white',
                      fontSize: '18px',
                      position: 'relative',
                      right: '100%'
                    }}
                  >
                    Topics
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    {topics.map((item, index) => (
                      <Link
                        to={`${item.slug}/articles`}
                        style={{ textDecoration: 'none', outline: 'none' }}
                      >
                        <MenuItem
                          style={{ border: 'none' }}
                          onClick={this.handleClose}
                        >
                          {item.slug}
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
          </div>
        </nav>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Navbar;
