import React from 'react';
import { Form, Button } from 'react-bootstrap';

class AddComment extends React.Component {
  state = {
    comment: '',
    rate: '1'
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Njk5NjA2ZmM4YzAwMTU2Yjg2ZWIiLCJpYXQiOjE3MzI3OTg4NzAsImV4cCI6MTczNDAwODQ3MH0.cMoFL5VdMuduVlORWJQDnb_nhdUhz00n1BSK3Jh7sAk"
          },
          body: JSON.stringify({
            comment: this.state.comment,
            rate: this.state.rate,
            elementId: this.props.asin
          })
        }
      );

      if (response.ok) {
        this.setState({ comment: '', rate: '1' });
        this.props.onCommentAdded();
      }
    } catch (error) {
      console.error('Errore nell\'aggiunta del commento:', error);
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            id="comment-text"
            name="comment-text"
            placeholder="Aggiungi un commento..."
            value={this.state.comment}
            onChange={(e) => this.setState({ comment: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select
            id="rating-select"
            name="rating"
            value={this.state.rate}
            onChange={(e) => this.setState({ rate: e.target.value })}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia commento
        </Button>
      </Form>
    );
  }
}

export default AddComment;