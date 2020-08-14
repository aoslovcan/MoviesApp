import React, { Component } from 'react';

import './style.css';

class MovieList extends Component {
    render() {
        return (
            <>
            <h1>Movies</h1>
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
              <tr>
                <th scope="row"><img src={this.props.items.poster.url}/></th>
                <td>{this.props.items.title}</td>
                <td>{this.props.items.year}</td>
                <td><a className="edit row col-sm-6" href={`/update/${this.props.items.id}`}> Edit</a> 
               
                 <a className="delete row col-sm-6" href="#"> Delete</a>
               
                 </td>
               
               
              </tr>
              
            </tbody>
          </table>
          </>
        );
    }
}

export default MovieList;