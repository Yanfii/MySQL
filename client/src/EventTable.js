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



function createData (id, name, num) {
  return { id, name, num };
}

var rows = [];

export default function EventTable(props) {
  var clients = props.clients
  clients.forEach( (event) =>
    rows.push(createData(event.event_id, event.date, event.location, event.user_id, event.title));
  )

  const [state, setState] = React.useState({
    columns: [
      { title: 'Event ID', field: 'id', type: 'numeric' },
      { title: 'Name', field: 'name' },
      { title: 'User ID', field: 'id' },
      { title: 'Title', field: 'name' },
    ],
    data: rows
  });

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
