import React, {Component} from 'react';
import './App.css';
import MyTable from './UserTable';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

  componentDidMount() {
    this.fetchClients()
  }

  render() {
    if (this.state.clients.length === 0) return <div></div>;
    return (
      <div className="App">
          <MyTable clients={this.state.clients}/>
      </div>
    );
  }
}

export default App;
