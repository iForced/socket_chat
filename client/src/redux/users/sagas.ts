import { call, put, takeEvery } from '@redux-saga/core/effects'
import { getAllUsersRequest, UsersSagaActions } from './actions'

export function * watchGetAllUsersRequestSaga() {
    yield takeEvery(UsersSagaActions.GET_ALL_USERS_REQUEST, getAllUsersRequestSaga)
}
export function * getAllUsersRequestSaga(action: ReturnType<typeof getAllUsersRequest>) {

}
