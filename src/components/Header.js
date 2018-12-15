import React from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { navigate } from '@reach/router';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  textSize: {
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.566)'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: 350
    }
  },
  buttonMarg: {
    [theme.breakpoints.up('md')]: {
      marginRight: 500
    },
    [theme.breakpoints.only('xs')]: {
      marginRight: 0
    }
  }
});

const Header = props => {
  const { classes } = props;
  return (
    <>
      <header className="header">
        <Grid
          container
          alignItems="center"
          direction="row"
          style={{ padding: 20 }}
          justify="center"
          spacing={32}
        >
          <Grid item xs={12} md={4}>
            <Link to="/" style={{ textDecoration: 'none', outline: 'none' }}>
              <p className="headerText" style={{ margin: 0, padding: 0 }}>
                NC News
              </p>
            </Link>
          </Grid>

          <Grid item xs={12} md={4} container justify="flex-end">
            <Grid item xs={12}>
              {props.user && (
                // <Typography>NC NEWS efsfef</Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.textSize}
                >
                  Logged in as: {props.user}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container direction="row" justify="center">
              <Grid item>
                {props.user && (
                  <Button
                    className={classes.buttonMarg}
                    color="primary"
                    variant="raised"
                    onClick={props.handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </header>
    </>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
