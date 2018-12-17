import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    [theme.breakpoints.down('sm')]: {
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.566)'
    }
  },
  buttonMarg: {
    [theme.breakpoints.down('sm')]: {
      marginRight: 0
    }
  },
  flexAd: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  }
});

const Header = props => {
  const { classes } = props;
  return (
    <>
      <header style={{ height: 140 }} className="header">
        <Grid
          container
          alignItems="center"
          direction="row"
          style={{ padding: 20 }}
          spacing={32}
        >
          <Grid item xs={12} md={4}>
            <Link to="/" style={{ textDecoration: 'none', outline: 'none' }}>
              <p
                className="headerText"
                style={{
                  padding: 0,
                  width: 300,
                  margin: 'auto'
                }}
              >
                NC News
              </p>
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid
              className={classes.flexAd}
              container
              direction="row"
              justify="flex-end"
            >
              <Grid item>
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
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid
              className={classes.flexAd}
              container
              direction="row"
              justify="flex-end"
            >
              <Grid item>
                {props.user && (
                  <Button
                    className={classes.buttonMarg}
                    color="primary"
                    variant="contained"
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
