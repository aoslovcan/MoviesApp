import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import Dropzone from "react-dropzone";

const token = sessionStorage.getItem('token');
class Edit extends Component {

    constructor(props) {
        super(props)

        this.state = {

            url: '',
            id: '',
            token: token,
            title: '',
            year: '',
            fileName: []
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleDrop = acceptedFiles =>
        this.setState({ fileName: acceptedFiles.map(file => file.name) });

    componentDidMount() {
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
                    token: token
                });
            })
    }

    changeHandler(e) {

        const target = e.target;
        //console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        //console.log(this.state);
        let data = this.state;
        axios.put('http://localhost:3001/update', data)
            .then(res => {
                //console.log(JSON.parse(res.data));
                window.location.href = "/movies";
            })
    }
    render() {
        const { url, title, year, fileName } = this.state;
        return (
         <div className="Form">
            <div className="container">
                <form className="editForm" onSubmit={this.handleSubmit}>
                    <h1>Edit</h1>
                    <div className="form-group row">
                        <label class="col-sm-12"> Title*: </label>
                        <div class="col-sm-6">
                            <input type="text"
                                value={title}
                                name="title"
                                onChange={this.changeHandler}
                                className="form-control"
                                placeholder="title" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label class="col-sm-12">Publication year:</label>
                        <div class="col-sm-6">
                            <input type="text"
                                value={year}
                                onChange={this.changeHandler}
                                name="year"
                                className="form-control"
                                placeholder="year" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label class="col-sm-12 col-form-label">Cover image*:</label>
                        <div className="col-sm-4"> <img src={url} /></div>
                    </div>
                    <div className="form-group row">
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
                            <button className="cancle" type="cancel" onClick={() => this.setState(window.location.reload(false)
                            )}>Cancel</button>
                        </div>
                        <div className="col-sm-5">
                            <button className="submit" type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}
export default Edit;