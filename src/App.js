import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Movies from './routes/Movies';
import Login from './routes/Login';
import Edit from './routes/Edit';
import Create from './routes/Create';
import Home from './routes/Home';

function App() {
  return (
    
     <Router>
      <Switch>
      <Route path="/login" component={Login}/>
        <Route path="/movies" component={Movies}/>
        <Route path="/update/:id" component={Edit}/>
        <Route path="/create" component={Create}/>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Router>
    
  );
}

export default App;
