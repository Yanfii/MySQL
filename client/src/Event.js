import React, {Component} from 'react';
import NavBar from './NavBar';
import EventTable from './EventTable';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: true,
    };
  }

  fetchEvents = () => {
    fetch("http://localhost:9000/testAPI/events")
      .then(res => res.text())
      .then(res => {
        this.setState({ events: JSON.parse(res)["events"] })
      });
  }

  componentDidMount() {
    this.fetchEvents()
  }

  render() {
    if (this.state.events.length === 0) return <NavBar></NavBar>;
    else {
      return (
        <div className="Events">
          <NavBar></NavBar>
            <EventTable events={this.state.events}/>
        </div>
      );
    }
  }
}

export default Event
