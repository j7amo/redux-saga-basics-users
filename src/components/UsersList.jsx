import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserRequest } from '../actions/users';

export default function UsersList() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const userDeleteHandler = (id) => {
    dispatch(deleteUserRequest(id));
  };

  return (
    <ListGroup>
      {users
        .sort((a, b) => {
          if (a.firstName > b.firstName) {
            return 1;
          }

          if (a.firstName < b.firstName) {
            return -1;
          }
          // if firstName is the same we have to do the comparison of lastNames
          if (a.lastName > b.lastName) {
            return 1;
          }

          if (a.lastName < b.lastName) {
            return -1;
          }

          return 0;
        })
        .map((user) => (
          <ListGroupItem key={user.id}>
            <section style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexGrow: 1 }}>
                {user.firstName}
                {' '}
                {user.lastName}
              </div>
              <Button
                outline
                color="danger"
                onClick={() => userDeleteHandler(user.id)}
              >
                Delete
              </Button>
            </section>
          </ListGroupItem>
        ))}
    </ListGroup>
  );
}
