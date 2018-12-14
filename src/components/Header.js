import React from 'react';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

const Header = props => {
  return (
    <>
      <header
        className="header"
        style={{
          display: 'flex',

          textAlign: 'left',
          lineHeight: '1.6',
          paddingLeft: '10%'
        }}
      >
        <Link
          onClick={() => props.handleTopic('Articles')}
          to="/"
          style={{ textDecoration: 'none', outline: 'none' }}
        >
          <div className="headerText">NC NEWS</div>
        </Link>
        <Grid
          container
          justify="flex-end"
          style={{ marginLeft: 500 }}
          alignItems="center"
        >
          <Grid item>
            {props.user && (
              <Typography
                style={{ textAlign: 'right' }}
                variant="h6"
                color="primary"
              >
                Logged in as: {props.user}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            {props.user && (
              <Button
                style={{ marginRight: 250 }}
                color="primary"
                variant="raised"
                onClick={props.handleLogout}
              >
                Logout
              </Button>
            )}
          </Grid>
        </Grid>
      </header>
    </>
  );
};

export default Header;
