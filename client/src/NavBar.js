import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import Event from './Event';

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

let indicator = window.location.href.length > 22

class NavBar extends Component {
    
	state = {
		current: indicator? 'app': 'mail'
	}

	handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

	render() {
	return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mail">
					<div>
          <Icon type="mail" />
					<Link to="/">Users View</Link>
				</div>
        </Menu.Item>
        <Menu.Item key="app">
					<div>
          <Icon type="appstore" />
          <Link to="/events">Events View</Link>
					</div>
        </Menu.Item>
      </Menu>
    );
	}
}

export default NavBar;
