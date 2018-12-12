import React, { Component } from 'react';
import * as api from '../api/api';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import PostArticle from './PostAnArticle';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  color: { color: 'white' },
  float: {}
});

class Articles extends Component {
  state = {
    articles: [],
    topic: '',
    postedArticle: {}
  };

  componentDidMount = () => {
    if (this.props.topic) {
      api.getArticles(this.props.topic).then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    } else {
      api.getArticles().then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.topic !== prevProps.topic) {
      api.getArticles(this.props.topic).then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    }
    console.log('updated');
    console.log(this.props.update);
    if (this.props.update !== prevProps.update) {
      api.getArticles(this.props.topic).then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    }
  };

  render() {
    if (this.state.articles.length > 0) {
      const { classes } = this.props;
      return (
        <>
          <Button
            style={{
              color: 'red',
              fontSize: '18px'
            }}
          >
            <PostArticle />
          </Button>
          <ul id="articles" style={{ width: '80%', margin: 'auto' }}>
            <div className={classes.root}>
              {this.state.articles.map((item, index) => {
                return (
                  <>
                    <ExpansionPanel style={{ margin: '10px' }}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          variant="subtitle2"
                          style={{
                            fontSize: '20px',
                            width: '180%',
                            textAlign: 'left'
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Grid
                          container
                          spacing={10}
                          direction={'row'}
                          justify="flex-end"
                        >
                          <Grid item>
                            <Link
                              to={`/articles/${item.article_id}`}
                              style={{
                                textDecoration: 'none',
                                outline: 'none'
                              }}
                            >
                              <Button
                                variant="outlined"
                                style={{
                                  marginLeft: '10px',
                                  backgroundColor: 'white',
                                  color: 'rgb(252, 71, 71)',
                                  flex: 0
                                }}
                                className={classes.float}
                              >
                                View Article
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link
                              to={`/articles/${item.article_id}`}
                              style={{
                                textDecoration: 'none',
                                outline: 'none'
                              }}
                            >
                              <Button
                                variant="outlined"
                                style={{
                                  marginLeft: '10px',
                                  backgroundColor: 'white',
                                  color: 'rgb(252, 71, 71)'
                                }}
                                className={classes.float}
                              >
                                delete item
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography
                          style={{ textAlign: 'left' }}
                          className={styles.heading}
                        >
                          {item.body.substring(0, 400)}....
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </>
                );
              })}
            </div>
          </ul>
        </>
      );
    } else {
      return <h1>loading</h1>;
    }
  }
}

Articles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Articles);

// PATCH /api/articles/:article_id
// ```
// - accepts an object in the form `{  inc_votes: newVote  }`
//     - `newVote` will indicate how much the `votes` property in the database should be updated by
//     E.g  `{ inc_votes : 1 }` would increment the current article's vote property by 1
//          `{ inc_votes : -100 }` would decrement the current article's vote property by 100

// DELETE /api/articles/:article_id
// ```

// - should delete the given article by `article_id`
// - should respond with an empty object
