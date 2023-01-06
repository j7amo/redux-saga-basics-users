import { all } from 'redux-saga/effects';
import usersSagas from './users';

// STEP-5:
// define ROOT saga that uses "all" effect, it's a bit like Promise.all call,
// in this case we wait for all WATCHER sagas
export default function* rootSaga() {
  yield all([...usersSagas]);
}

// proceed to index.js(entry point) for STEP-6
