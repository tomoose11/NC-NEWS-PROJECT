import React, { Component } from 'react';
import * as api from '../api/api';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from '@reach/router';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  color: { color: 'red' }
});

class Articles extends Component {
  state = {
    articles: [],
    topic: ''
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
  };

  render() {
    if (this.state.articles.length > 0) {
      return (
        <>
          <ul id="articles" style={{ width: '80%', margin: 'auto' }}>
            <div className={styles.root}>
              {this.state.articles.map((item, index) => {
                return (
                  <>
                    <ExpansionPanel style={{ margin: '10px' }}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          variant="subtitle2"
                          style={{ fontSize: '20px' }}
                        >
                          {item.title}
                        </Typography>

                        <Link
                          to={`/articles/${item.article_id}`}
                          style={{ textDecoration: 'none', outline: 'none' }}
                        >
                          <Button
                            style={{
                              marginLeft: '100px',
                              backgroundColor: 'rgb(252, 71, 71)',
                              color: 'white'
                            }}
                          >
                            View Article
                          </Button>
                        </Link>
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

export default Articles;
