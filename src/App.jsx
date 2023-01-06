import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import {
  createUserRequest,
  getUsersRequest,
  usersError,
} from './actions/users';
import UsersList from './components/UsersList';
import NewUser from './components/NewUser';

function App() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.error);

  const userAddHandler = (data) => {
    dispatch(createUserRequest(data));
  };

  const alertCloseHandler = () => {
    dispatch(usersError(null));
  };

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  return (
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
      <Alert color="danger" isOpen={error} toggle={alertCloseHandler}>
        {error}
      </Alert>
      <NewUser onSubmit={userAddHandler} />
      <UsersList />
    </div>
  );
}

export default App;
