import React, { Component } from 'react';
import * as api from '../api/api';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Image from '../images/beef_noodle.png';
import Image2 from '../images/jonathan-riley-118591-unsplash.jpg';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 900,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
});

class Comments extends Component {
  state = {
    comments: []
  };

  componentDidMount = () => {
    this.handleCommentsForArticle();
  };

  render() {
    const { classes } = this.props;
    return (
      <List style={{ margin: 'auto' }} className={classes.root}>
        {this.state.comments.map((item, index) => {
          return (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={Image2} />
              </ListItemAvatar>
              <ListItemText
                primary={item.body}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.author}
                    </Typography>
                    {item.created_at}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={Image2} />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={Image} />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    );
  }

  handleCommentsForArticle = () => {
    api.getCommentsForArticle(this.props.article_id).then(data => {
      console.log(data);
      this.setState({
        comments: data.comments
      });
    });
  };
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
