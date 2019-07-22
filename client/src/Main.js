import React, {Component} from 'react';
import App from './App';
import Navbar from './NavBar';

class Main extends Component {
    render() {
         return (
        <div>
            <Navbar />
            <App />
        </div>
        );
    }
  }

export default Main