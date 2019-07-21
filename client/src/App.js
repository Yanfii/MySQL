import React, {Component} from 'react';
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
          <MyTable clients={this.state.clients}/>
      </div>
    );
  }
}

export default App;
