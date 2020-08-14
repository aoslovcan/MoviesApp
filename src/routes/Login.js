import React, { Component } from 'react';
import './style.css';
import MovieList from '../components/MovieList';
import axios from 'axios';

class Login extends Component {

    constructor(props){
        super(props)
    
        this.state = {
           email : '',
        password : ''
          
        }
       this.handleSubmit = this.handleSubmit.bind(this);
      }


      changeHandler = x => {
        this.setState({
          [x.target.name] : x.target.value
        });
      }
    
      handleSubmit(e) {
        e.preventDefault();
       const data = {
           email : this.state.email,
           password : this.state.password
       }

       console.log(data)
    
       axios.post('http://localhost:3001/auth/local', { data})
       .then(res => {
         console.log(JSON.parse(res.data));
         let data = JSON.parse(res.data);
         sessionStorage.setItem('token', data['jwt']); 
         
         window.location.href = "/movies";
       })

      
      
    }
      
    render() {
        const {email, password}= this.state;
        return (
            <div className="rega">
      
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2" >Email :</label>
                <div className="col-sm-10">
                  <input className="form-control " id="email" type="email" value={email} name="email" onChange={this.changeHandler} />
                </div>
    
              </div>
             
              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2" >Password :</label>
                <div className="col-sm-10">
                  <input className="form-control " id="pass" type="password"  value={password}  name="password" onChange={this.changeHandler}/>
                </div>
              </div>
    
    
    
              <button className="button" type="submit">Prijava</button>
            </form>
          </div>
        );
    }
}

export default Login;