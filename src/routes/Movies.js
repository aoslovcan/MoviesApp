import React, { Component } from 'react';
import './style.css';
import MovieList from '../components/MovieList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

class Movies extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }
  }
  componentDidMount() {

    let token = sessionStorage.getItem('token');
    axios.get('http://localhost:3001/movies', { 'headers': { 'Authorization': token } })
      .then(res => {
        let items = JSON.parse(res.data);
        //console.log(items);
        this.setState({
          items: items
        });
      })
  }
  render() {
    const { items } = this.state;
    return (
      <div className="movies">
        <div className="container">
          <div className="row">
            <h1>Movies</h1>
            <div className="col-sm-12">
              <a href="/create"><FontAwesomeIcon icon="plus" color=" #CF1313" size="2x" /></a>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Cover image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Publication year</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map(item =>
                    <MovieList title="Movies" key={item.id} items={item} />
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default Movies;