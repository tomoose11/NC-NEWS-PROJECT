import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as api from '../api/api';
import { navigate } from '@reach/router';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SimpleSnackbar from '../components/snackbar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class PostArticle extends React.Component {
  state = {
    open: false,
    title: '',
    body: '',
    submitted: false,
    topic: '',
    snack: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    if (!this.state.submitted) {
      return (
        <div>
          <Button
            variant="outlined"
            style={{
              color: 'white',
              border: '1px solid white',
              marginRight: 10
            }}
            onClick={this.handleClickOpen}
          >
            Post an Article
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
                <DialogContentText>Please select a topic</DialogContentText>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-native-simple"
                  >
                    Topic
                  </InputLabel>
                  <Select
                    native
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
                        name="topic"
                        labelWidth={this.state.labelWidth}
                        id="outlined-age-native-simple"
                      />
                    }
                  >
                    <option value="" />
                    <option value="football">football</option>
                    <option value="coding">coding</option>
                    <option value="cooking">cooking</option>
                  </Select>
                </FormControl>
                <DialogContentText>
                  Please enter the title of your article
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  name="title"
                  onChange={this.handleChange}
                  id="name"
                  label="title:"
                  type="text"
                  fullWidth
                />

                <DialogContentText>
                  Write the body of your article here
                </DialogContentText>
                <TextField
                  label="body:"
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
                <Button
                  onClick={this.handleClose}
                  type="submit"
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <SimpleSnackbar
            message="ARTICLE MUST CONTAIN A BODY, TITLE AND TOPIC"
            snack={this.state.snack}
          />
        </div>
      );
    } else {
      return (
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={'lg'}
          fullWidth
        >
          <div class="wrap">
            <div class="loading">
              <div class="bounceball" />
              <div class="text">NOW LOADING</div>
            </div>
          </div>
        </Dialog>
      );
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.body.length < 1 ||
      this.state.title.length < 1 ||
      this.state.topic.length < 1
    ) {
      this.setState(
        {
          snack: true
        },
        () => {
          setTimeout(() => {
            this.setState({ snack: false });
          }, 3000);
        }
      );
      return this.handleClose();
    }
    this.setState({
      submitted: true
    });
    console.log(this.state.title, this.state.body);
    api
      .postArticle(
        {
          title: this.state.title,
          user_id: this.props.user_id,
          body: this.state.body
        },
        this.state.topic
      )
      .then(data => {
        console.log(data);
        this.setState({
          submitted: false
        });
        navigate(`/articles/afterpost/${this.state.title}`, { id: 1 });
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

PostArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostArticle);

// POST /api/topics/:topic/articles
// ```

// - accepts an object containing a `title` , `body` and a `user_id` property
// - responds with the posted article
