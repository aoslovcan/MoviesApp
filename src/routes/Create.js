import React, { Component } from 'react';
import './style.css';
import MovieList from '../components/MovieList';
import axios from 'axios';
import Dropzone from "react-dropzone";

const token = sessionStorage.getItem('token');

class Create extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fileName: [],
            title: '',
            year: '',
            token: token
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleDrop = acceptedFiles =>
        this.setState({ fileName: acceptedFiles.map(file => file.name) });

        cancel(){
          
       
           window.location.href="/movies";
        }
    

    changeHandler = x => {
        this.setState({
            [x.target.name]: x.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = this.state;
        //console.log(data);

        axios.post('http://localhost:3001/create', { data })
            .then(res => {
                console.log(JSON.parse(res.data));
                let data = JSON.parse(res.data);
                window.location.href = "/movies";
            })
    }

    render() {
        const { title, year, fileName } = this.state;
        return (
            <div className="add">
                <div className="container">
                    <form className="create" onSubmit={this.handleSubmit}>
                        <h1 style={{ fontSize: '48px', lineHeight: '60px', top: '120px' }}>Create a new movie</h1>
                        <div className="form-group  row">
                            <label htmlFor="title" className="col-sm-12" >Title</label>
                            <div className="col-sm-6">
                                <input className="form-control " id="title" type="text" value={title}
                                 name="title" onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="year" className="col-sm-12" >Publication year</label>
                            <div className="col-sm-6">
                                <input className="form-control " id="year" type="text" value={year} name="year"
                                 onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="year" className="col-sm-12" >Cover image</label>
                            <div className="col-sm-6">
                                <Dropzone onDrop={this.handleDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div  {...getRootProps({ className: "dropzone" })}>
                                            <input {...getInputProps()} />
                                            <p>Drop image here {fileName.map(file => file)}
                                            </p>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-3">
                            <button className="cancle" type="reset"  onClick={ this.cancel}>Cancel</button>
                            </div>
                            <div className="col-sm-5">
                                <button className="submit" type="submit">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Create;