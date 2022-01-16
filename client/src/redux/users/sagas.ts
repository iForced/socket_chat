import { call, put, takeEvery } from '@redux-saga/core/effects'
import { setAllUsers, UsersSagaActions } from './actions'
import { usersAPI } from '../../api/usersAPI'
import { UserType } from '../auth/types'

export function * watchGetAllUsersRequestSaga() {
    yield takeEvery(UsersSagaActions.GET_ALL_USERS_REQUEST, getAllUsersRequestSaga)
}
export function * getAllUsersRequestSaga() {
    const allUsers: Array<UserType> = yield call(usersAPI.getAll)
    yield put(setAllUsers(allUsers))
}
