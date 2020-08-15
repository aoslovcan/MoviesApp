import React, { Component } from 'react';
import './style.css';
import MovieList from '../components/MovieList';
import axios from 'axios';

class Home extends Component {
    render() {
      
        return (
            <>
            <div className="cover">
                <div className="inner">
                    <h1>Welcome</h1>
                <a className="submit" href="/login">Login</a>
                </div>
        
            </div>
        
           </>
        );
    }
}

export default Home;