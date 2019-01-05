import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import * as api from '../api/api';
import * as utils from '../utils/utils';

class Votes extends React.Component {
  render() {
    return (
      <div>
        <IconButton
          disabled={
            this.props.votes < this.props.originalVotes ||
            this.props.votes > this.props.originalVotes
              ? true
              : false
          }
          onClick={
            !this.props.item
              ? () => this.props.handleVote(1)
              : () =>
                  this.props.handleVote(
                    this.props.item.comment_id,
                    1,
                    this.props.item.votes
                  )
          }
          aria-label="Share"
        >
          <i className="fas fa-thumbs-up fa-xs" />
        </IconButton>
        <Button
          variant="outlined"
          onClick={
            !this.props.item
              ? () =>
                  this.props.handleReset(
                    this.props.votes,
                    this.props.originalVotes,
                    api.vote
                  )
              : () =>
                  this.props.handleReset(
                    this.props.votes,
                    this.props.originalVotes,
                    api.voteOnComment,
                    this.props.item
                  )
          }
        >
          Reset Vote
        </Button>
        <IconButton
          disabled={
            this.props.votes < this.props.originalVotes ||
            this.props.votes > this.props.originalVotes
              ? true
              : false
          }
          onClick={
            !this.props.item
              ? () => this.props.handleVote(-1)
              : () =>
                  this.props.handleVote(
                    this.props.item.comment_id,
                    -1,
                    this.props.item.votes
                  )
          }
          aria-label="Share"
        >
          <i className="fas fa-thumbs-down fa-xs" />
        </IconButton>
      </div>
    );
  }
}

export default Votes;
