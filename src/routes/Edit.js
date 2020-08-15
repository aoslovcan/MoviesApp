import React, { Component } from 'react';
import './style.css';
import MovieList from '../components/MovieList';
import axios from 'axios';

class Edit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [],
            isLoaded: false,
            redirect: false,
            url: '',
            id : '',
            token: '',
            title: '',
            year: ''




        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

        let token = sessionStorage.getItem('token');
        let movieId = this.props.match.params.id;
        axios.get('http://localhost:3001/movies/' + movieId + '', { 'headers': { 'Authorization': token } })
            .then(res => {
                let items = JSON.parse(res.data);
                console.log(items.poster['url']);

                this.setState({
                    title: items.title,
                    year: items.year,
                    id: movieId,
                    url: items.poster['url'],
                    token : token
                });
            })

    }

    changeHandler(e) {

        const target = e.target;

        const value = target.value;

        const name = target.name;


        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });

    }
    handleSubmit(e) {
        e.preventDefault();
     
        console.log(this.state);
    let data = this.state;

  
    axios.put('http://localhost:3001/update',  data)
    .then(res => {
      console.log(JSON.parse(res.data));
     
     
      
      
    })
   
        
       
        
      }
    render() {
        const { id, url, title, year } = this.state;
        return (
            <div className="container">
                <div className="row" id="unos" >
                    <div class="col-6 offset-3">
                        <h4>Edit</h4>
                        <form onSubmit={this.handleSubmit}
                             >
                            <div className="form-group row">
                                <label class="col-sm-12 col-form-label"> Title*: </label>
                                <div class="col-sm-9">
                                    <input type="text"
                                        value={title}
                                        name="title"
                                        onChange={this.changeHandler}
                                        className="form-control"
                                        placeholder="naziv" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label class="col-sm-12 col-form-label">Publication year:</label>
                                <div class="col-sm-9">
                                    <input type="text"
                                        value={year}
                                        onChange={this.changeHandler}
                                        name="year"
                                        className="form-control"
                                        placeholder="cijena" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label class="col-sm-12 col-form-label">Cover image*:</label>
                                <div className="col-sm-4"> <img src={url} /></div>
                               </div>
                            <button type="submit" className="btn"><strong>Unesi</strong></button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default Edit;