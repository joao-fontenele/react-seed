import {
    _PENDING,
    _FULFILLED,
    _REJECTED,
} from 'appRoot/default/store/actions/action-types';
import {
    updateObject,
} from 'appRoot/default/store/utils/';

const initialState = {
    isRequesting: false,
    error: null,
};

const pendingRegex = new RegExp(_PENDING);
const fulfilledRegex = new RegExp(_FULFILLED);
const rejectedRegex = new RegExp(_REJECTED);

const uiReducer = function(state=initialState, action) {
    if (pendingRegex.test(action.type)) {
        return updateObject(
            state,
            {isRequesting: true}
        );
    } else if (fulfilledRegex.test(action.type)) {
        return updateObject(
            state,
            {isRequesting: false, error: null}
        );
    } else if (rejectedRegex.test(action.type)) {
        return updateObject(
            state,
            {isRequesting: false, error: action.payload.promise}
        );
    }

    return state;
};

export default uiReducer;
