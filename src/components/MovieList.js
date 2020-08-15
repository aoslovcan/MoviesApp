import React, { Component } from 'react';

import './style.css';
import axios from 'axios';
const token = sessionStorage.getItem('token');
class MovieList extends Component {
  constructor(props){
    super(props)

    this.state = {
       id : '',
       token : token
      
    }
 
  }


  deleteMember() {
    var data = {
        id: this.state.id,
        token : this.state.token
    }
    console.log(data.id);

    axios.delete('http://localhost:3001/delete', {
      headers: {
        'Authorization': this.state.token
      },
      data: data
    })
    .then(res => {
    
      console.log(res);

     
  })

}
    render() {
        return (
            <>
         
              <tr>
                <th scope="row"><img src={this.props.items.poster.url}/></th>
                <td>{this.props.items.title}</td>
                <td>{this.props.items.year}</td>
                <td><a className="edit row col-sm-6" href={`/update/${this.props.items.id}`}> Edit</a> 
               
                 <a  onClick={() => this.setState({ id: this.props.items.id },
                                                    this.deleteMember
                                                )} className="delete row col-sm-6"> Delete</a>
               
                 </td>
               
               
              </tr>
              
           
          </>
        );
    }
}

export default MovieList;