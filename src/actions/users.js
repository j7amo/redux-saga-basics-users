export const Types = {
  GET_USERS_REQUEST: 'users/get_users_request',
  GET_USERS_SUCCESS: 'users/get_users_success',
  CREATE_USER_REQUEST: 'users/create_user_request',
  DELETE_USER_REQUEST: 'users/delete_user_request',
  USERS_ERROR: 'users/error',
};

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export const getUsersSuccess = (data) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: data,
});

export const createUserRequest = (data) => ({
  type: Types.CREATE_USER_REQUEST,
  payload: data,
});

export const deleteUserRequest = (data) => ({
  type: Types.DELETE_USER_REQUEST,
  payload: data,
});

export const usersError = (error) => ({
  type: Types.USERS_ERROR,
  payload: error,
});
