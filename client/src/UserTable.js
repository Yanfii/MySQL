import React from 'react';
import './Table.css';
import MaterialTable from 'material-table';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function createData (id, first_name, last_name, num) {
  return { id, first_name, last_name, num };
}

var rows = [];
var pushed = false

export default function SimpleTable(props) {
  var clients = props.clients
  clients.forEach( (client) => {
    // if (pushed === false) {
      rows.push(createData(client.user_id, client.first_name, client.last_name, client.phone_number))}
    // }
  )
  
  pushed = true

  const [state, setState] = React.useState({
    columns: [
      { title: 'User ID', field: 'id', editable: 'never'},
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
                  console.log("huh", response)
                  return response.json()
                }).then(json => {
                  NotificationManager.success('Client created successfully!', 'Success');
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
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              {
                let data = [...state.data];
                console.log("initially", data)
                console.log("old data", oldData)
                const index = data.indexOf(oldData);
                data.splice(index, 1);
                console.log("huh", data)
                setState({ data: data })
                fetch(`http://localhost:9000/testAPI/clients/${index + 1}`, {
                  method: 'DELETE'
                }).then(response => {
                  console.log("huh", response)
                  return response.json()
                }).then(json => {
                  NotificationManager.success('Client deleted successfully!', 'Success');
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
