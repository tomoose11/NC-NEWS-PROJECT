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
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import throttle from 'lodash.throttle';
import SimpleSnackbar from '../components/snackbar';
import { navigate } from '@reach/router/lib/history';
import image from '../images/sandro-schuh-football.jpg';
import image2 from '../images/dlanor-s-703975-unsplash (1).jpg';
import image3 from '../images/hue12-photography-668091-unsplash.jpg';

const picOb = {
  football: image,
  coding: image2,
  cooking: image3
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
          this.setState({ articles: data.articles });
        })
        .catch(err => {
          navigate('/err', { state: { err: err.message }, replace: true });
        });
    } else {
      api.getArticles(this.props.topic, query).then(data => {
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

    if (
      this.props.topic !== prevProps.topic ||
      this.state.ascending !== prevState.ascending ||
      this.state.extendedQuery !== prevState.extendedQuery
    ) {
      api.getArticles(this.props.topic, query).then(data => {
        this.setState({
          articles: data.articles,
          page: 1,
          windowHeight: window.innerHeight
        });
      });
    }

    if (this.props.update !== prevProps.update) {
      api.getArticles(this.props.topic, query).then(data => {
        this.setState({ articles: data.articles });
      });
    }
  };

  handleDeleteArticle = (e, id) => {
    e.stopPropagation();
    api.deleteArticle(id).then(data => {});
    this.setState(prevState => ({
      articles: prevState.articles.filter(item => {
        return id !== item.article_id;
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
    this.setState({
      extendedQuery: `&sort_by=${columnName}`,
      windowHeight: 980,
      page: 1
    });

    this.handleClose();
  };

  handleScroll = e => {
    if (window.innerHeight + window.scrollY > this.state.windowHeight - 50) {
      this.handlethrottle();
    }
  };

  handlethrottle = () => {};

  handleReq = () => {
    this.setState(prevState => ({
      windowHeight: prevState.windowHeight + (window.innerHeight - 230)
    }));

    let query = this.state.ascending
      ? '?sort_ascending=true'
      : '?sort_ascending=false';
    query = query + this.state.extendedQuery;
    query = query + '&p=' + this.state.page;
    api
      .getArticles(this.props.topic, query)
      .then(data => {
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
              message="ALL ARTICLES HAVE LOADED"
              open={this.state.open}
            />
            <div className={classes.root}>
              {this.state.articles.map((item, index) => {
                return (
                  <div style={{ marginRight: 15 }} key={item.title}>
                    <ExpansionPanel
                      style={{ marginTop: '1%' }}
                      className={classes.cardWidth}
                    >
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
                              src={picOb[item.topic]}
                              id="img"
                              style={{ height: 100, width: 100 }}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <Typography
                              variant="subtitle2"
                              style={{
                                textAlign: 'left'
                              }}
                              className={classes.textSize}
                            >
                              {item.title}
                            </Typography>
                            <Grid item>
                              <Grid container direction="row">
                                <Typography
                                  variant="h3"
                                  style={{
                                    textAlign: 'left',
                                    color: 'grey'
                                  }}
                                  className={classes.textSize}
                                >
                                  {item.created_at.substring(0, 10)}
                                </Typography>
                                <Typography
                                  variant="h3"
                                  style={{
                                    textAlign: 'left',
                                    color: 'rgba(177, 171, 171, 0.911)'
                                  }}
                                  className={classes.textSize}
                                >
                                  topic: {item.topic}
                                </Typography>
                                <Typography
                                  variant="h3"
                                  style={{
                                    textAlign: 'left',
                                    color: 'rgba(177, 171, 171, 0.911)'
                                  }}
                                  className={classes.textSize}
                                >
                                  votes: {item.votes}
                                </Typography>
                                <Typography
                                  variant="h3"
                                  style={{
                                    textAlign: 'left',
                                    color: 'rgba(177, 171, 171, 0.911)'
                                  }}
                                  className={classes.textSize}
                                >
                                  by: {item.author}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid
                              item
                              sm={3}
                              container
                              justify="flex-end"
                              alignItems="flex-end"
                            >
                              <Link
                                jj="jj"
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
                              <Grid item>
                                <Button
                                  onClick={e =>
                                    this.handleDeleteArticle(e, item.article_id)
                                  }
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
