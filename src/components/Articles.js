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
import SimpleSnackbar from '../components/snackbar';
import { navigate } from '@reach/router/lib/history';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import image from '../images/sandro-schuh-80814-unsplash.jpg';
import image2 from '../images/dlanor-s-703975-unsplash (1).jpg';
import image3 from '../images/hue12-photography-668091-unsplash.jpg';

const picOb = {
  0: image,
  1: image2,
  2: image3
};

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
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  image: {
    width: 60,
    height: 60
  }
});

///// end of old

class Articles extends Component {
  state = {
    articles: [],
    topic: '',
    postedArticle: {},
    ascending: false,
    anchorEl: null,
    extendedQuery: '',
    page: 1,
    windowHeight: window.innerHeight,
    open: false
  };

  componentDidMount = () => {
    let query = this.state.ascending
      ? '?sort_ascending=true'
      : '?sort_ascending=false';
    if (this.props.topic) {
      api
        .getArticles(this.props.topic, query)
        .then(data => {
          console.log(data);
          this.setState({ articles: data.articles });
        })
        .catch(err => {
          console.log('wonderful err message', err.message);
          navigate('/err', { state: { err: err.message }, replace: true });
        });
    } else {
      api.getArticles(this.props.topic, query).then(data => {
        console.log(data);
        this.setState({ articles: data.articles });
      });
    }
    window.addEventListener('scroll', this.handleScroll);
    this.handlethrottle = throttle(this.handleReq, 2000);
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
      console.log('xxxxxxxxxxxxxxxxxxx');
      api.getArticles(this.props.topic, query).then(data => {
        console.log(data);
        this.setState({
          articles: data.articles,
          page: 1,
          windowHeight: window.innerHeight
        });
      });
    }
    console.log('updated');
    console.log(this.props.update);
    if (this.props.update !== prevProps.update) {
      console.log('xxxxxxxxxxxxxxxxxxx');
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
        extendedQuery: `&sort_by=${columnName}`,
        windowHeight: 980,
        page: 1
      },
      () => {
        console.log(this.state.extendedQuery);
      }
    );

    this.handleClose();
  };

  handleScroll = e => {
    console.log(e);
    console.log(window.innerHeight);
    //const throttled = throttle(this.handleReq, 500);
    console.log('docbod', this.state.windowHeight);
    console.log('windheight', window.innerHeight + window.scrollY);
    if (window.innerHeight + window.scrollY > this.state.windowHeight - 50) {
      this.handlethrottle();
    }
  };

  handlethrottle = () => {};

  handleReq = () => {
    this.setState(prevState => ({
      windowHeight: prevState.windowHeight + (window.innerHeight - 230)
    }));
    console.log('yyyyyyyyyyyyyyyyy');
    console.log('called throttled');
    let query = this.state.ascending
      ? '?sort_ascending=true'
      : '?sort_ascending=false';
    query = query + this.state.extendedQuery;
    query = query + '&p=' + this.state.page;
    api
      .getArticles(this.props.topic, query)
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          articles: [...prevState.articles, ...data.articles],
          page: prevState.page + 1
        }));
      })
      .catch(err => {
        this.setState({
          open: true
        });
      });
  };

  render() {
    console.log(Object.keys(this.state.articles));
    if (this.state.articles.length > 0) {
      const { classes } = this.props;
      return (
        <>
          <ul className="articles card" style={{ margin: 'auto' }}>
            <Grid
              container
              spacing={8}
              direction="row"
              justify="space-around"
              style={{
                padding: 10,
                borderBottom: '1px solid grey'
              }}
            >
              <Grid item>
                <Button onClick={() => this.handleSortAscending(false)}>
                  Sort Descending
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => this.handleSortAscending(true)}>
                  Sort Ascending
                </Button>
              </Grid>
              <Grid item>
                <Fab variant="extended" onClick={this.handleClick}>
                  Sort by:{' '}
                  <i
                    className="fas fa-caret-down"
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
                      key={item}
                      style={{ border: 'none' }}
                      onClick={() => this.handleSortBy(item)}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
            </Grid>
            <SimpleSnackbar
              message="THIS IS THE LAST ARTICLE"
              open={this.state.open}
            />
            <div className={classes.root}>
              {this.state.articles.map((item, index) => {
                return (
                  <div key={item.title}>
                    <ExpansionPanel style={{ marginTop: '1%' }}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid
                          container
                          spacing={32}
                          direction="row"
                          justify="space-evenly"
                        >
                          <Grid item sm={2}>
                            <img
                              className={classes.img}
                              alt="complex"
                              src={picOb[index % 3]}
                              id="img"
                              style={{ height: 100, width: 100 }}
                            />
                          </Grid>
                          <Grid item direction="column" sm={6}>
                            <Typography
                              variant="subtitle2"
                              style={{
                                textAlign: 'left'
                              }}
                              className={classes.textSize}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="h3"
                              style={{
                                textAlign: 'left'
                              }}
                              className={classes.textSize}
                            >
                              {item.created_at}
                            </Typography>
                          </Grid>
                          <Grid item justify="flex-end" alignItems="flex-end">
                            <Grid
                              item
                              sm={3}
                              container
                              justify="flex-end"
                              alignItems="flex-end"
                            >
                              <Link
                                to={`/articles/${item.article_id}`}
                                style={{
                                  textDecoration: 'none',
                                  outline: 'none'
                                }}
                              >
                                <Fab
                                  style={{
                                    marginTop: 30,
                                    transform: 'scale(1.2)'
                                  }}
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                >
                                  View
                                </Fab>
                              </Link>
                            </Grid>
                          </Grid>
                          {item.author === this.props.user && (
                            <Grid
                              container
                              direction="column"
                              spacing={16}
                              justify="flex-end"
                            >
                              <Grid item spacing={16}>
                                <Button
                                  onClick={e =>
                                    this.handleDeleteArticle(e, item.article_id)
                                  }
                                  variant="extended"
                                  style={{ color: 'red' }}
                                  size="small"
                                >
                                  delete item
                                </Button>
                              </Grid>
                            </Grid>
                          )}
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
                  </div>
                );
              })}
            </div>
          </ul>
        </>
      );
    } else {
      return (
        <div className="wrap">
          <div className="loading">
            <div className="bounceball" />
            <div className="text">NOW LOADING</div>
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
