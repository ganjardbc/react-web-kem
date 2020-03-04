import { call, put } from 'redux-saga/effects';
import AuthActions from '../redux/AuthRedux';
import { isEmpty } from 'ramda';

export function* getAuth(api, action) {
	const { data } = action;
    const response = yield call(api.userAuth, data);

	if (typeof atob !== 'undefined') {
		console.log('===> ', response);
	}
    
	if (response.ok && response.data && !isEmpty(response.data.token)) {
        // const response_detail = yield call(api.getUserDetail, response.data.token);
        let payload = {
            ...response.data,
            // ...response_detail.data
		};
		console.info(payload);
		localStorage.setItem("access_token", payload.token);
		const userInfo = {
			isLoggedIn:true,
			id:payload.id,
			nisn:payload.nisn,
			usname:payload.usname,
			id_avatar:payload.id_avatar,
		};
		localStorage.setItem("user_info",JSON.stringify(userInfo));
        yield put(AuthActions.authSuccess(payload));
	} else {
		if (response.data && response.data.status === 500) {
			return yield put(AuthActions.authFailure({
				path: 'Sign In',
				message: response.data.message, response
			}));
		}
		yield put(AuthActions.authFailure('NISN atau Password Salah !'));
	}
}