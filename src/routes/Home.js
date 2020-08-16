import React, { Component } from 'react';
import './style.css';

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