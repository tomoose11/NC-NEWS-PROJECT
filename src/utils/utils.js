export const handleVotesState = function(originalVotes, myItem) {
  if (!myItem) {
    this.setState({
      votes: originalVotes
    });
  } else {
    this.setState(prevState => ({
      comments: prevState.comments.map((item, index) => {
        if (item.comment_id === myItem.comment_id) {
          return {
            ...item,
            votes: prevState.newComments[index].votes
          };
        } else {
          return item;
        }
      })
    }));
  }
};

export const handleResetVote = function(
  votes,
  originalVotes,
  patchVote,
  myItem = null,
  index
) {
  let number = 0;
  if (votes > originalVotes) {
    this.handleVotesState(originalVotes, myItem);
    number = -1;
  }
  if (votes < originalVotes) {
    this.handleVotesState(originalVotes, myItem);
    number = 1;
  }
  if (myItem) {
    patchVote(this.props.article_id, number, myItem.comment_id).then(
      data => {}
    );
  } else {
    patchVote(this.props.article_id, number);
  }
};
