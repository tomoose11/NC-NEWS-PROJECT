import React, { Component } from 'react';
import * as api from '../api/api';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Comments from './Comments';
import image from '../images/sandro-schuh-football.jpg';
import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import image2 from '../images/dlanor-s-703975-unsplash (1).jpg';
import image3 from '../images/hue12-photography-668091-unsplash.jpg';
import * as utils from '../utils/utils';
import Votes from './votes';

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
  constructor() {
    super();
    this.handleVotesState = this.handleVotesState.bind(this);
    this.handleResetVote = this.handleResetVote.bind(this);
    this.state = { expanded: false, SingleArticle: {}, comments: [], votes: 0 };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  componentDidMount = () => {
    this.handleSingleArticle();
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
              <Votes
                votes={this.state.votes}
                originalVotes={this.state.SingleArticle.votes}
                handleVote={this.handleVote}
                handleReset={this.handleResetVote}
                article_id={this.props.article_id}
                handleVotesState={this.handleVotesState}
              />

              <Typography style={{ position: 'relative', marginRight: 80 }}>
                number of votes:{this.state.votes}
              </Typography>
              <Button
                color="secondary"
                variant="contained"
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
                  <Typography paragraph />
                </CardContent>
                <Comments
                  user={this.props.user}
                  article_id={this.props.article_id}
                  user_id={this.props.user_id}
                />
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
        this.setState({
          SingleArticle: data.article,
          votes: data.article.votes
        });
      })
      .catch(err => {
        navigate('/err', {
          state: { err: err.message },
          replace: true
        });
      });
  };

  handleVotesState = utils.handleVotesState;
  handleResetVote = utils.handleResetVote;

  handleVote = number => {
    if (this.state.votes === 0 && number < 0) return;
    api.vote(this.props.article_id, number).then(data => {});
    this.setState(prevState => ({
      votes: prevState.SingleArticle.votes + number
    }));
  };
}

SingleArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleArticle);
