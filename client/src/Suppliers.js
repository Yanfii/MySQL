import React, {Component} from 'react';
import NavBar from './NavBar';
import SuppliersTable from './SuppliersTable';

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      isLoading: true,
    };
  }

  fetchSuppliers = () => {
    fetch("http://localhost:9000/testAPI/suppliers")
      .then(res => res.text())
      .then(res => {
        this.setState({ suppliers: JSON.parse(res)["suppliers"] })
      });
  }

  componentDidMount() {
    this.fetchSuppliers()
  }

  render() {
    if (this.state.suppliers.length === 0) return <NavBar></NavBar>;
    else {
      return (
        <div className="Suppliers">
          <NavBar></NavBar>
            <SuppliersTable suppliers={this.state.suppliers}/>
        </div>
      );
    }
  }
}

export default Suppliers
