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
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import throttle from 'lodash.throttle';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  color: { color: 'white' },
  textSize: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 18
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 20
    }
  },

  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class Articles extends Component {
  state = {
    articles: [],
    topic: '',
    postedArticle: {},
    ascending: false,
    anchorEl: null,
    extendedQuery: ''
  };

  componentDidMount = () => {
    let query = this.state.ascending
      ? '?sort_ascending=true'
      : '?sort_ascending=false';
    if (this.props.topic) {
      api.getArticles(this.props.topic, query).then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    } else {
      api.getArticles(this.props.topic, query).then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    }
    window.addEventListener('scroll', this.handleScroll);
    this.handlethrottle = throttle(this.handleReq, 500);
  };

  componentDidUpdate = (prevProps, prevState) => {
    let query = this.state.ascending
      ? '?sort_ascending=true'
      : '?sort_ascending=false';
    query = query + this.state.extendedQuery;
    console.log(this.props);
    if (
      this.props.topic !== prevProps.topic ||
      this.state.ascending !== prevState.ascending ||
      this.state.extendedQuery !== prevState.extendedQuery
    ) {
      api.getArticles(this.props.topic, query).then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    }
    console.log('updated');
    console.log(this.props.update);
    if (this.props.update !== prevProps.update) {
      api.getArticles(this.props.topic, query).then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    }
  };

  handleDeleteArticle = (e, id) => {
    e.stopPropagation();
    api.deleteArticle(id).then(data => {
      console.log(data);
    });
    this.setState(prevState => ({
      articles: prevState.articles.filter((item, index) => {
        if (id !== item.article_id) {
          console.log(item.article_id);
          return item;
        } else {
          console.log('found');
        }
      })
    }));
  };

  handleSortAscending = value => {
    this.setState({
      ascending: value
    });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSortBy = columnName => {
    this.setState(
      {
        extendedQuery: `&sort_by=${columnName}`
      },
      () => {
        console.log(this.state.extendedQuery);
      }
    );

    this.handleClose();
  };

  handleScroll = e => {
    console.log(e);
    console.log(window.scrollY);
    //const throttled = throttle(this.handleReq, 500);
    if (
      window.innerHeight + window.scrollY >
      document.body.offsetHeight - 200
    ) {
      this.handlethrottle();
    }
  };

  handlethrottle = () => {};

  handleReq = () => {
    console.log('called throttled');
    // axios
    //   .get(
    //     `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&offset=${
    //       this.state.offset
    //     }&limit=10`
    //   )
    //   .then(dat => {
    //     const {
    //       data: { features }
    //     } = dat;
    //     //console.log(features[0].properties.title);
    //     this.setState(prevState => ({
    //       arr: [...prevState.arr, ...features],
    //       offset: prevState.offset + 10
    //     }));
    //   });
  };

  render() {
    console.log(Object.keys(this.state.articles));
    if (this.state.articles.length > 0) {
      const { classes } = this.props;
      return (
        <>
          <ul id="articles" style={{ margin: 'auto' }}>
            <Grid
              container
              spacing={10}
              direction={'row'}
              justify="space-around"
              style={{
                padding: 10,
                borderBottom: '1px solid grey'
              }}
            >
              <Grid item>
                <Button
                  onClick={() => this.handleSortAscending(false)}
                  variant="extended"
                  style={{ margin: 'auto' }}
                >
                  Sort Descending
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => this.handleSortAscending(true)}
                  variant="extended"
                  style={{ margin: 'auto' }}
                >
                  Sort Ascending
                </Button>
              </Grid>
              <Grid item>
                <Fab variant="extended" onClick={this.handleClick}>
                  Sort by:{' '}
                  <i
                    class="fas fa-caret-down"
                    style={{ paddingLeft: '5px', margin: 'auto' }}
                    aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  />
                </Fab>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  {Object.keys(this.state.articles[0]).map((item, index) => (
                    <MenuItem
                      style={{ border: 'none' }}
                      onClick={() => this.handleSortBy(item)}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
            </Grid>

            <div className={classes.root}>
              {this.state.articles.map((item, index) => {
                return (
                  <>
                    <ExpansionPanel style={{ marginTop: '1%' }}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          variant="subtitle2"
                          style={{
                            width: '180%',
                            textAlign: 'left'
                          }}
                          className={classes.textSize}
                        >
                          {item.title}
                        </Typography>
                        <Grid
                          container
                          spacing={10}
                          direction={'row'}
                          justify="flex-end"
                        >
                          {item.author === this.props.user && (
                            <Grid item>
                              <Button
                                onClick={e =>
                                  this.handleDeleteArticle(e, item.article_id)
                                }
                                variant="outlined"
                                style={{
                                  marginLeft: '10px',
                                  backgroundColor: 'white',
                                  color: 'rgb(252, 71, 71)',
                                  zIndex: 1
                                }}
                                className={classes.float}
                              >
                                delete item
                              </Button>
                            </Grid>
                          )}
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
      return (
        <div class="wrap">
          <div class="loading">
            <div class="bounceball" />
            <div class="text">NOW LOADING</div>
          </div>
        </div>
      );
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
