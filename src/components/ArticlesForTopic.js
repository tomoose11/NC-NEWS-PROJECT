import React, { Component } from 'react';
import * as api from '../api/api';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class ArticlesForTopic extends Component {
  state = {
    articles: [],
    topic: ''
  };

  componentDidMount = () => {
    console.log('lkjlkj', this.props.topic);
    api.getArticles(this.props.topic).then(data => {
      console.log(data);
      this.setState({ articles: data.articles });
    });
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
            {/* <MuiThemeProvider theme={theme} /> */}
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
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography className={styles.heading}>
                          {item.body}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </>
                );
              })}
            </div>
          </ul>
          <Button>jljlk</Button>
        </>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

export default ArticlesForTopic;
