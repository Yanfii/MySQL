import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MyTable from './Table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { clients: [] };
  }

  fetchClients = () => {
    fetch("http://localhost:9000/testAPI/clients")
      .then(res => res.text())
      .then(res => {
        this.setState({ clients: JSON.parse(res)["clients"] })
      });
  }

  componentWillMount = () => {
    this.fetchClients()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div>
          <MyTable clients={this.state.clients}/>
        </div>

      </div>
    );
  }
}

export default App;
