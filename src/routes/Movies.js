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
      isLoaded: false
    }
  }

  logout(){
    sessionStorage.clear();

    window.location.href = '/'
  }
  componentDidMount() {
   
    let token = sessionStorage.getItem('token');

    if(token){ axios.get('http://localhost:3001/movies', { 'headers': { 'Authorization': token } })
    .then(res => {
      let items = JSON.parse(res.data);
      //console.log(items);
      this.setState({
        items: items,
        isLoaded: true
      });
    })}
   
  }
  render() {
    const { items, isLoaded } = this.state;
    if (!isLoaded) {
      return <div classname="blank">
        <div className="innerBlank">You have to login  <a className="submit" href="/login">Login</a>
        </div>
        </div>;
  }
  else{
    return (
      <div className="movies">
        <button type="reset" className="submit" onClick={ this.logout}>Home</button>
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
}
export default Movies;