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
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 900,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Comments extends Component {
  state = {
    comments: [],
    entry: '',
    open: false
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount = () => {
    this.handleCommentsForArticle();
  };

  render() {
    const { classes } = this.props;
    return (
      <List style={{ margin: 'auto' }} className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <DialogContentText>
            Would you like to write a comment?
          </DialogContentText>

          <TextField
            variant="outlined"
            required
            id="expDate"
            label="enter your comment here"
            fullWidth
            multiline={true}
            rows={2}
            name="body"
            rowsMax={100}
            style={{ position: 'relative', marginBottom: 10 }}
            onChange={this.handleChange}
          />
          <Button
            style={{ position: 'relative', marginBottom: 50 }}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
        {this.state.comments.map((item, index) => {
          return (
            <ListItem
              style={{ borderBottom: '1px solid rgba(228, 216, 216, 0.692)' }}
              alignItems="flex-start"
            >
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
                    {item.author === 'tickle122' && (
                      <Button
                        onClick={() =>
                          this.handleDeleteComment(item.comment_id)
                        }
                        color="secondary"
                      >
                        Delete
                      </Button>
                    )}
                    <IconButton
                      onClick={() => this.handleVote(-1)}
                      aria-label="Share"
                    >
                      <i class="fas fa-thumbs-down fa-xs" />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleVote(-1)}
                      aria-label="Share"
                    >
                      <i class="fas fa-thumbs-up fa-xs" />
                    </IconButton>
                    <Typography
                      style={{ position: 'relative', marginRight: 80 }}
                    >
                      number of votes:
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              OK
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </List>
    );
  }

  handleDeleteComment = id => {
    api.deleteComment(id).then(data => {
      console.log(data);
    });
    this.setState(prevState => ({
      comments: prevState.comments.filter((item, index) => {
        if (id !== item.comment_id) {
          console.log(item.comment_id);
          return item;
        } else {
          console.log('found');
        }
      })
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('submitted');
    const comment = { user_id: 1, body: this.state.entry };
    api.postComment(this.props.article_id, comment).then(data => {
      console.log(data);
      this.setState({ open: true });
    });
    this.setState(
      prevState => ({
        comments: [
          { ...comment, author: 'tommy2222 posted just now' },
          ...prevState.comments
        ]
      }),
      () => {
        console.log(this.state.comments);
      }
    );
    console.log(this.props.width);
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ entry: e.target.value });
  };

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
