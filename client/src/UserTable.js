import React from 'react';
import './Table.css';
import MaterialTable from 'material-table';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function createData (id, first_name, last_name, num) {
  return { id, first_name, last_name, num };
}

var rows = [];

export default function SimpleTable(props) {
  var clients = props.clients
  clients.forEach( (client) =>
    rows.push(createData(client.user_id, client.first_name, client.last_name, client.phone_number))
  )

  const [state, setState] = React.useState({
    columns: [
      { title: 'User ID', field: 'id', type: 'numeric' },
      { title: 'First name', field: 'first_name' },
      { title: 'Last name', field: 'last_name' },
      { title: 'Phone', field: 'num' },
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
                fetch('http://localhost:9000/testAPI/test', {
                  method: 'PUT',
                  body: JSON.stringify({
                    first_name: newData.first_name,
                    last_name: newData.last_name,
                    phone_number: newData.num,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }).then(response => {
                  return response.json()
                }).then(json => {
                  NotificationManager.success('Client created successfully!', 'Success');
                })
                const data = [...state.data];
                data.push(newData);
                setState({ ...state, data });
              }
              resolve();
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
    </div>
    
  );
}
