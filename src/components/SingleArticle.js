import React, { Component } from 'react';
import * as api from '../api/api';
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

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
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
  }
});

class SingleArticle extends Component {
  state = { expanded: false, SingleArticle: {}, comments: [] };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  componentDidMount = () => {
    console.log(this.props.article_id);
    this.handleSingleArticle();
  };

  render() {
    if (Object.keys(this.state.SingleArticle).length > 0) {
      return (
        <Card>
          <h1>{this.state.SingleArticle.title}</h1>

          <CardMedia
            image="/static/images/cards/paella.jpg"
            title="Paella dish"
          />
          <CardContent>
            <Typography component="p">
              {this.state.SingleArticle.body}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Comments:</Typography>
              <Typography paragraph />
              <Typography paragraph>
                <Comments article_id={this.props.article_id} />
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      );
    } else {
      return <h1>kjl</h1>;
    }
  }

  handleSingleArticle = () => {
    api.getSingleArticle(this.props.article_id).then(data => {
      console.log(data);
      console.log(data.article);
      this.setState({
        SingleArticle: data.article
      });
    });
  };
}

export default SingleArticle;
