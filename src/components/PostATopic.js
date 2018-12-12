import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as api from '../api/api';

export default class PostATopic extends React.Component {
  state = {
    open: false,
    topic: '',
    body: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="white"
          style={{ color: 'white', border: '1px solid white' }}
          onClick={this.handleClickOpen}
        >
          Post an Topic
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={'lg'}
          fullWidth
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Post an Article</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the title of your topic
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="topic"
                onChange={this.handleChange}
                id="name"
                label="topic:"
                type="text"
                fullWidth
              />

              <DialogContentText>
                Write a description of your topic here
              </DialogContentText>
              <TextField
                label="description:"
                multiline={true}
                rows={9}
                name="body"
                onChange={this.handleChange}
                rowsMax={100}
                fullWidth
                maxWidth={'md'}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.title, this.state.body);
    api
      .postTopic({
        slug: this.state.topic,
        description: this.state.body
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

// POST /api/topics/:topic/articles
// ```

// - accepts an object containing a `title` , `body` and a `user_id` property
// - responds with the posted article
