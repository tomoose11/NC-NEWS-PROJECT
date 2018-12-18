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
import Image2 from '../images/jonathan-riley-118591-unsplash.jpg';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as utils from '../utils/utils';
import Votes from './votes';

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
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComments: [],
      entry: '',
      open: false,
      votes: 0,
      isLoading: false
    };

    this.handleVotesState = this.handleVotesState.bind(this);
    this.handleResetVote = this.handleResetVote.bind(this);
  }

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
              key={item.comment_id}
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
                    {`    ${item.created_at.substring(0, 10)}`}
                    {item.author === this.props.user && (
                      <Button
                        onClick={() =>
                          this.handleDeleteComment(item.comment_id)
                        }
                        color="secondary"
                      >
                        Delete
                      </Button>
                    )}
                    <Votes
                      votes={item.votes}
                      originalVotes={this.state.newComments[index].votes}
                      handleVote={this.handleVote}
                      handleReset={this.handleResetVote}
                      article_id={this.article_id}
                      item={item}
                    />
                    {/* <IconButton
                      disabled={
                        item.votes < this.state.newComments[index].votes ||
                        item.votes > this.state.newComments[index].votes
                          ? true
                          : false
                      }
                      onClick={() =>
                        this.handleVote(item.comment_id, -1, item.votes)
                      }
                      aria-label="Share"
                    >
                      <i className="fas fa-thumbs-down fa-xs" />
                    </IconButton>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        this.handleResetVote(
                          this.state.votes,
                          this.state.newComments[index].votes,
                          api.voteOnComment,
                          item,
                          index
                        )
                      }
                    >
                      Reset Vote
                    </Button>
                    <IconButton
                      disabled={
                        item.votes < this.state.newComments[index].votes ||
                        item.votes > this.state.newComments[index].votes
                          ? true
                          : false
                      }
                      onClick={() =>
                        this.handleVote(item.comment_id, 1, item.votes)
                      }
                      aria-label="Share"
                    >
                      <i className="fas fa-thumbs-up fa-xs" />
                    </IconButton> */}
                    <Typography
                      style={{ position: 'relative', marginRight: 80 }}
                    >
                      number of votes: {item.votes}
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
          message={<span id="message-id">Comment Posted</span>}
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

  handleVote = (id, number, votes) => {
    if (votes === 0 && number < 0) return;
    api.voteOnComment(this.props.article_id, number, id).then(data => {});
    this.setState(prevState => ({
      comments: prevState.comments.map((item, index) => {
        if (item.comment_id === id) {
          return {
            ...item,
            votes: prevState.newComments[index].votes + number
          };
        } else {
          return item;
        }
      })
    }));
  };

  handleVotesState = utils.handleVotesState;

  handleResetVote = utils.handleResetVote;

  handleDeleteComment = id => {
    api.deleteComment(id).then(data => {
      alert('Comment deleted');
    });
    this.setState(prevState => ({
      comments: prevState.comments.filter(item => {
        return id !== item.comment_id;
      })
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const comment = { user_id: this.props.user_id, body: this.state.entry };
    this.setState({ isLoading: true });
    api.postComment(this.props.article_id, comment).then(data => {
      this.setState({ open: true, isLoading: false });
    });

    this.setState(
      prevState => ({
        comments: [
          {
            body: this.state.entry,
            article_id: this.props.article_id,
            votes: this.state.votes,
            author: this.props.user,
            comment_id: 4,
            created_at: 'createdNow'
          },
          ...prevState.comments
        ],
        newComments: [
          {
            body: this.state.entry,
            article_id: this.props.article_id,
            votes: this.state.votes,
            author: this.props.user,
            comment_id: 4,
            created_at: 'createdNow'
          },
          ...prevState.newComments
        ]
      }),
      () => {}
    );
  };

  handleChange = e => {
    this.setState({ entry: e.target.value });
  };

  handleCommentsForArticle = () => {
    api.getCommentsForArticle(this.props.article_id).then(data => {
      this.setState({
        comments: data.comments,
        newComments: data.comments
      });
    });
  };
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
