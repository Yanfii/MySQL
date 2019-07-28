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


function createData (item_id, date, units_purchased, name_description, cost_per_unit, rating, transportation_details, decor_type) {
  return {item_id, date, units_purchased, name_description, cost_per_unit, rating, transportation_details, decor_type};
}


var rows = [];
export default function TransactionTable(props) {

	function handleOk() {
		setState({...state, visible: false})
	}
  console.log(props);
  var tmp_row = []
  var events = props.events;

  console.log("HERE ARE THE EVENT PROPS!");
  console.log(props.events);

  events.forEach( (trans) =>
    tmp_row.push(createData(trans.item_id, trans.date, trans.units_purchased, trans.name_description, trans.cost_per_unit, trans.rating, trans.transportation_details, trans.decor_type))
  )
  rows = tmp_row;
  console.log("HERE ARE THE ROWS!");
  console.log(rows);
  const [state, setState] = React.useState({
    decor_items: [],
    columns: [
      { title: 'Item ID', field: 'item_id', editable: 'never' },
      { title: 'Transaction Date', field: 'date' },
      { title: 'Units Purchased', field: 'units_purchased' },
      { title: 'Description', field: 'name_description', type: 'numeric' },
      { title: 'Cost Per Unit', field: 'cost_per_unit' },
      { title: 'Rating', field: 'rating' },
      { title: 'Transportation Details', field: 'transportation_details' },
      { title: 'Decor Type', field: 'decor_type' },
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
      actions = {[
        {
          icon: 'contacts',
          tooltip: 'View Transactions',
          onClick: (event, rowData) => {
            new Promise(resolve => {
              setTimeout(() => {
                {
                  fetch(`http://localhost:9000/testApi/decor/${rowData.event_id}`)
									.then(response => response.text())
                  .then(response => {
                    console.log(response);
                    console.log(JSON.parse(response)["decor_items"]);
                    setState({ ...state, visible: true, decor_items: JSON.parse(response)["decor_items"]  })
									 })
                }
                resolve();
              }, 600);
            });
          }
        }
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              {
                fetch('http://localhost:9000/testAPI/insert_event', {
                  method: 'POST',
                  body: JSON.stringify({
                    event_id: newData.event_id,
                    date: newData.date, location: newData.location,
                    user_id: newData.user_id,
                    title: newData.title,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }).then(response => {
                  return response.json()
                }).then(json => {
                  NotificationManager.success('Event created successfully!', 'Success');
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

                fetch(`http://localhost:9000/testAPI/events/${oldData.event_id}`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    event_id: newData.event_id,
                    date: newData.date,
                    location: newData.location,
                    user_id: newData.user_id,
                    title: newData.title,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }).then(response => {
                  return response.json()
                }).then(json => {
                  NotificationManager.success('Event updated successfully!', 'Success');
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
              fetch(`http://localhost:9000/testAPI/events/${oldData.event_id}`, {
                method: 'DELETE'
              }).then(response => {
                return response.json()
              }).then(json => {
                NotificationManager.success('Event deleted successfully!', 'Success');
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
