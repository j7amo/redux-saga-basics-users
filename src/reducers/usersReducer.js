import { Types } from '../actions/users';

const INITIAL_STATE = {
  items: [],
};

// eslint-disable-next-line default-param-last
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
