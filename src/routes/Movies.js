import React, { Component } from 'react';
import './style.css';
import MovieList from '../components/MovieList';
import axios from 'axios';

class Movies extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            items: [],
            isLoaded: false,
            redirect: false
           
            
        }
      }
      componentDidMount() {

        let token = sessionStorage.getItem('token');
        axios.get('http://localhost:3001/movies',  { 'headers': { 'Authorization': token } })
        .then(res => {
            let items = JSON.parse(res.data);
          console.log(items);

          this.setState({
              items : items
          });
        })
    }
    render() {
        const {items} = this.state; 
        return (
            <div className="movies">
                  <a href="/create">Create new</a>
                  <div className="container">
               
                      <div className="row"> <h1>Movies</h1>
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
                                <MovieList title="Movies" key= {item.id} items={item}/>
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