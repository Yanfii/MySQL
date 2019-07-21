import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit'
import Link from 'react-router';
import './Table.css';


function createData (id, name, num) {
  return { id, name, num };
}

var rows = [];

export default function SimpleTable(props) {
  var clients = props.clients
  clients.forEach( (client) =>
    rows.push(createData(client.user_id, client.first_name + " " + client.last_name, client.phone_number))
  )

  return (
    <Paper className="root">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Events</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell>
                <Link to="users/{row.id}">
                  <EditIcon/>
                </Link>
                {row.name}
              </TableCell>
              <TableCell>{row.num}</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
