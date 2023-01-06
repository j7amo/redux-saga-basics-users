import {
  call, fork, put, take, takeEvery, takeLatest,
} from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users'; // STEP-1:

// STEP-1:
// define a WORKER saga that will do all the work
function* getUsers() {
  // we use TRY-CATCH to prevent errors emitted in the WORKER saga
  // from bubbling up to the ROOT saga which can potentially affect other sagas
  try {
    // use CALL to create an Effect description that instructs the Redux Saga
    // middleware to call "getUsers" with args as arguments (in this case we don't pass any).
    // Saga middleware will then:
    // - CALL the function;
    // - examine the result of calling:
    // 1) if RESULT is another GENERATOR then call it till completion;
    // 2) if RESULT is a PROMISE then wait for its resolution/rejection;
    // 3) if RESULT is neither GENERATOR nor PROMISE then keep it;
    // - pass the RESULT back to "getUsers" and resume "getUsers"
    // This process is BLOCKING:
    const response = yield call(api.getUsers);
    // It is just like with async/await combo and the next line of code will run AFTER
    // the previous line completed (after yield call)
    // we use PUT to create an Effect description that will instruct Saga Middleware to
    // SCHEDULE A DISPATCH of action (it is almost like just calling (dispatch()):
    yield put(actions.getUsersSuccess(response.data.data));
  } catch (err) {
    yield put(actions.usersError(err.message));
  }
}

// when an action is dispatched WATCHER saga passes it to corresponding WORKER saga
function* createUser(action) {
  try {
    yield call(api.createUser, action.payload);
    // once we added a new user we can get updated list:
    yield call(api.getUsers);
  } catch (err) {
    yield put(actions.usersError(err.message));
  }
}

function* deleteUser(id) {
  try {
    yield call(api.deleteUser, id);
    yield call(api.getUsers);
  } catch (err) {
    yield put(actions.usersError(err.message));
  }
}

// STEP-2:
// define a WATCHER saga that will watch for a specific action type
// and FOR EVERY action of this type it will FORK the corresponding WORKER saga
export function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

export function* watchCreateUserRequest() {
  // 'takeLatest' is almost like 'takeEvery' BUT it cancels previous fork
  // if a new action is dispatched (So basically it is kind of debouncing trick)
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

export function* watchDeleteUserRequest() {
  // we use while(true) loop here because we want to be sure that we have ONLY ONE
  // call to "deleteUser" worker saga and ignore all the rest until it finishes its job.
  // So basically while(true) + "take" effect is kind of debouncing trick
  while (true) {
    // "take" creates an effect that instructs Saga Middleware to WAIT for a specific action,
    // and we can get hold of this action right inside WATCHER saga (which is kind of unusual)
    const action = yield take(actions.Types.DELETE_USER_REQUEST);
    // and then call the WORKER saga we want:
    yield call(deleteUser, action.payload);
  }
}

// STEP-3:
// take all WATCHERS and fork (create a NON-BLOCKING separate process) them inside array
const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
];

// STEP-4:
// export forked sagas array
export default usersSagas;

// proceed to sagas/index.js for STEP-5
