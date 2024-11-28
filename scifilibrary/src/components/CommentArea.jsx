import React from 'react';
import { Alert } from 'react-bootstrap';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

class CommentArea extends React.Component {
  state = {
    comments: [],
    error: null,
    loading: true
  };

  fetchComments = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          }
        }
      );
      if (response.ok) {
        const comments = await response.json();
        this.setState({ 
          comments,
          error: null,
          loading: false
        });
      } else {
        this.setState({ 
          error: 'Errore nel caricamento dei commenti',
          loading: false
        });
      }
    } catch (error) {
      this.setState({ 
        error: 'Errore nel caricamento dei commenti',
        loading: false
      });
    }
  };

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    const { comments, error, loading } = this.state;

    if (loading) return <div>Caricamento commenti...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
      <div className="mt-4">
        <h4>Commenti</h4>
        <CommentsList 
          comments={comments} 
          onCommentDeleted={this.fetchComments}
        />
        <AddComment 
          asin={this.props.asin} 
          onCommentAdded={this.fetchComments}
        />
      </div>
    );
  }
}

export default CommentArea;