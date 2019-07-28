import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom';
import './Table.css';
import MaterialTable from 'material-table';
import { Modal } from 'antd';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function createData (supplier_id, name, contact_info, type) {
  return { supplier_id, name, contact_info, type }
}


var rows = [];
export default function SuppliersTable(props) {

	function handleOk() {
		setState({...state, visible: false})
	}
  var tmp_row = []
  var suppliers = props.suppliers;
  suppliers.forEach( (supplier) =>
    tmp_row.push(createData(supplier.supplier_id, supplier.name, supplier.contact_info, supplier.type))
  )
  rows = tmp_row;
  const [state, setState] = React.useState({
    decor_items: [],
    columns: [
      { title: 'Supplier ID', field: 'supplier_id', type: 'numeric', editable: 'never' },
      { title: 'Name', field: 'name' },
      { title: 'Contact Info', field: 'contact_info' },
      { title: 'Supplier Type', field: 'type', type: 'numeric' },
    ],
    data: rows
  });

  return (
    <div>
      <NotificationContainer/>
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              {
                fetch('http://localhost:9000/testAPI/insert_supplier', {
                  method: 'POST',
                  body: JSON.stringify({
                    supplier_id: newData.supplier_id,
                    name: newData.name,
                    contact_info: newData.contact_info,
                    typee: newData.type,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }).then(response => {
                  return response.json()
                }).then(json => {
                  NotificationManager.success('Supplier created successfully!', 'Success');
                })
                const data = [...state.data];
                newData.id = state.data.length + 1
                data.push(newData);
                setState({ ...state, data });
              }
              resolve();
            }, 600);
          }),
				onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              {
                let data = [...state.data];
                const index = data.indexOf(oldData);
                data[index] = newData;
                setState({ ...state, data });

                fetch(`http://localhost:9000/testAPI/suppliers/${oldData.supplier_id}`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    supplier_id: newData.supplier_id,
                    name: newData.name,
                    contact_info: newData.contact_info,
                    type: newData.type,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }).then(response => {
                  return response.json()
                }).then(json => {
                  NotificationManager.success('Supplier updated successfully!', 'Success');
                })
              }
              resolve();
            }, 600);
          }),
        onRowDelete: oldData =>
        new Promise(resolve => {
          setTimeout(() => {
            {
              let data = [...state.data];
              const index = data.indexOf(oldData);
              data.splice(index, 1);
              setState({ ...state, data });
              fetch(`http://localhost:9000/testAPI/suppliers/${oldData.supplier_id}`, {
                method: 'DELETE'
              }).then(response => {
                return response.json()
              }).then(json => {
                NotificationManager.success('Supplier deleted successfully!', 'Success');
              })
            }
            resolve();
          }, 600);
        }),
      }}
    />
  </div>
  );
}
