import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/Api';

import { AuthTypes } from '../redux/AuthRedux';
import { getAuth } from './AuthSagas';

const empApi = API.create('USERAUTH');

export default function* root() {
	yield all([
        takeLatest(AuthTypes.AUTH_REQUEST, getAuth, empApi),

    ]);
}