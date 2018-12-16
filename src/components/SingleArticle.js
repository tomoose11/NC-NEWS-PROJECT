import React, { Component } from 'react';
import * as api from '../api/api';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Comments from './Comments';
import image from '../images/sandro-schuh-football.jpg';
import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import image2 from '../images/dlanor-s-703975-unsplash (1).jpg';
import image3 from '../images/hue12-photography-668091-unsplash.jpg';

const picOb = {
  football: image,
  coding: image2,
  cooking: image3
};

const styles = theme => ({
  card: {
    maxWidth: 1300,
    minWidth: 200
  },
  media: {
    height: 0,
    paddingTop: '20.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  thisWidth: {
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      width: '93%',
      margin: 'auto'
    }
  },
  displayButton: {
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    }
  }
});

class SingleArticle extends Component {
  state = { expanded: false, SingleArticle: {}, comments: [], votes: 0 };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  componentDidMount = () => {
    console.log(this.props.article_id);
    this.handleSingleArticle();
    console.log('-->singArticle', this.props.user);
    console.log('jj', this.props.image);
  };

  render() {
    const { classes } = this.props;

    if (Object.keys(this.state.SingleArticle).length > 0) {
      return (
        <div style={{ margin: 'auto' }} className="articles card">
          <Card className={classes.thisWidth}>
            <h1>{this.state.SingleArticle.title}</h1>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  {this.state.SingleArticle.author[0]}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={this.state.SingleArticle.author}
              subheader={this.state.SingleArticle.created_at.substring(0, 10)}
            />
            <CardMedia
              className={classes.media}
              image={picOb[this.state.SingleArticle.topic]}
              title="Paella dish"
            />
            <CardContent>
              <Typography
                align="left"
                paragraph={true}
                style={{ fontSize: 17 }}
                component="p"
              >
                {this.state.SingleArticle.body}
              </Typography>
            </CardContent>

            <CardActions>
              <IconButton
                disabled={
                  this.state.votes > this.state.SingleArticle.votes ||
                  this.state.votes < this.state.SingleArticle.votes
                    ? true
                    : false
                }
                onClick={() => this.handleVote(1)}
                aria-label="Share"
              >
                <i className="fas fa-thumbs-up" />
              </IconButton>
              <Button variant="outlined" onClick={this.handleResetVote}>
                Reset Vote
              </Button>
              <IconButton
                disabled={
                  this.state.votes < this.state.SingleArticle.votes ||
                  this.state.votes > this.state.SingleArticle.votes
                    ? true
                    : false
                }
                onClick={() => this.handleVote(-1)}
                aria-label="Share"
              >
                <i className="fas fa-thumbs-down" />
              </IconButton>
              <Typography style={{ position: 'relative', marginRight: 80 }}>
                number of votes:{this.state.votes}
              </Typography>
              <Button
                color="secondary"
                variant="raised"
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
                className={classes.displayButton}
              >
                Click here to see comments:
              </Button>
              <IconButton
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <div style={{ height: 40 }} />
            <div className="articles">
              <Collapse
                className="articles"
                in={this.state.expanded}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography paragraph>Comments:</Typography>
                  <Typography paragraph />
                  <Typography paragraph>
                    <Comments
                      user={this.props.user}
                      article_id={this.props.article_id}
                      user_id={this.props.user_id}
                    />
                  </Typography>
                </CardContent>
              </Collapse>
            </div>
          </Card>
        </div>
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

  handleSingleArticle = () => {
    api
      .getSingleArticle(this.props.article_id)
      .then(data => {
        console.log(data);
        console.log(data.article);
        this.setState({
          SingleArticle: data.article,
          votes: data.article.votes
        });
      })
      .catch(err => {
        console.log(err);
        navigate('/err', {
          state: { err: err.message },
          replace: true
        });
      });
  };

  handleResetVote = () => {
    let number = 0;
    if (this.state.votes > this.state.SingleArticle.votes) {
      number = -1;
      this.setState({
        votes: this.state.SingleArticle.votes
      });
    }
    if (this.state.votes < this.state.SingleArticle.votes) {
      number = 1;
      this.setState({
        votes: this.state.SingleArticle.votes
      });
    }
    api.vote(this.props.article_id, number).then(data => {
      console.log(data);
    });
  };

  handleVote = number => {
    console.log(number);
    api.vote(this.props.article_id, number).then(data => {
      console.log(data);
    });
    this.setState(prevState => ({
      votes: prevState.SingleArticle.votes + number
    }));
  };
}

SingleArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleArticle);
