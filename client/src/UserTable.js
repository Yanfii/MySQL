import React from 'react';
import './Table.css';
import MaterialTable from 'material-table';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Modal } from 'antd';

function createData (id, first_name, last_name, num) {
  return { id, first_name, last_name, num };
}

var rows = [];
export default function SimpleTable(props) {
	function handleOk() {
		setState({...state, visible: false})
	}
  var clients = props.clients
  var tmp_rows = [];
  clients.forEach( (client) => {
      tmp_rows.push(createData(client.user_id, client.first_name, client.last_name, client.phone_number))}
  )
  rows = tmp_rows;


  const [state, setState] = React.useState({
		visible: false,
	  res_str: "",
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
      actions = {[
        {
          icon: 'contacts',
          tooltip: 'View Details',
          onClick: (event, rowData) => {
            new Promise(resolve => {
              setTimeout(() => {
                {
                  fetch(`http://localhost:9000/testAPI/clients/${rowData.id}`)
									.then(res => res.text())
                  .then(response => {
									   var parsed_res = JSON.parse(response)['clients'];
										 var res_str = "";
									   if (parsed_res.length === 0) {
										   res_str = "There are no purchases for this user";
						         } else {
                       console.log(parsed_res[0]);
                       res_str = "The purchases for this user total $" + parsed_res[0]["SUM(units_purchased*cost_per_unit)"].toString();
										 }
										 setState({ ...state, visible: true, res_str: res_str}); })
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
                fetch('http://localhost:9000/testAPI/test', {
                  method: 'POST',
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

                fetch(`http://localhost:9000/testAPI/clients/${oldData.id}`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    user_id: newData.id,
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
                  NotificationManager.success('Client updated successfully!', 'Success');
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
                fetch(`http://localhost:9000/testAPI/clients/${oldData.id}`, {
                  method: 'DELETE'
                }).then(response => {
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
		<Modal
			title="User Details"
			visible={state.visible}
			onOk={handleOk}
			onCancel={handleOk}
		>
			<p>{state.res_str}</p>
		</Modal>


    </div>

  );
}
