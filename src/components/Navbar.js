import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PostArticle from './PostAnArticle';
import PostATopic from './PostATopic';

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
    const { classes } = this.props;
    const { topics } = this.props;
    if (topics.length > 0) {
      return (
        <nav>
          <div
            className={classes.root}
            style={{ width: '100%', height: '100%' }}
          >
            <AppBar position="static">
              <Toolbar>
                <Typography
                  style={{ flex: 1, textAlign: 'center' }}
                  variant="h6"
                  color="inherit"
                >
                  {this.props.topic}
                </Typography>
                <Button
                  style={{ flex: 2, textAlign: 'center' }}
                  aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  style={{
                    color: 'white'
                  }}
                >
                  Topics{' '}
                  <i class="fas fa-caret-down" style={{ paddingLeft: '5px' }} />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  {topics.map((item, index) => (
                    <Link
                      onClick={() => this.props.handleTopic(item.slug)}
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
                <Button
                  style={{
                    color: 'white',
                    fontSize: '18px'
                  }}
                >
                  <PostArticle />
                </Button>
                <Button
                  style={{
                    color: 'white',
                    fontSize: '18px'
                  }}
                >
                  <PostATopic />
                </Button>
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

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);

// ```http
// POST /api/topics
// ```
// - accepts an object containing `slug` and `description` property, the `slug` must be unique
// - responds with the posted topic object
