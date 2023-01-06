import { Types } from '../actions/users';

const INITIAL_STATE = {
  users: [],
  error: null,
};

// eslint-disable-next-line default-param-last
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case Types.USERS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
