// if (this.state.votes > this.state.SingleArticle.votes) {
//   number = -1;
//   this.setState({
//     votes: this.state.SingleArticle.votes
//   });
// }

// this.setState(prevState => ({
//   comments: prevState.comments.map((item, index) => {
//     if (item.comment_id === myitem.comment_id) {
//       return {
//         ...item,
//         votes: prevState.newComments[index].votes
//       };
//     } else {
//       return item;
//     }
//   })
// }));

{
  /* <IconButton
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
              <Button
                variant="outlined"
                onClick={() =>
                  this.handleResetVote(
                    this.state.votes,
                    this.state.SingleArticle.votes,
                    api.vote
                  )
                }
              >
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
              </IconButton> */
}

{
  /* <IconButton
                      disabled={
                        item.votes < this.state.newComments[index].votes ||
                        item.votes > this.state.newComments[index].votes
                          ? true
                          : false
                      }
                      onClick={() =>
                        this.handleVote(item.comment_id, -1, item.votes)
                      }
                      aria-label="Share"
                    >
                      <i className="fas fa-thumbs-down fa-xs" />
                    </IconButton>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        this.handleResetVote(
                          this.state.votes,
                          this.state.newComments[index].votes,
                          api.voteOnComment,
                          item,
                          index
                        )
                      }
                    >
                      Reset Vote
                    </Button>
                    <IconButton
                      disabled={
                        item.votes < this.state.newComments[index].votes ||
                        item.votes > this.state.newComments[index].votes
                          ? true
                          : false
                      }
                      onClick={() =>
                        this.handleVote(item.comment_id, 1, item.votes)
                      }
                      aria-label="Share"
                    >
                      <i className="fas fa-thumbs-up fa-xs" />
                    </IconButton> */
}
