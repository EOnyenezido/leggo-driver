import { SET_USER_DETAILS } from "../actions/actions";

const initialState = {};

const userDetails = ( state = initialState, action ) => {
  switch (action.type) {
    case SET_USER_DETAILS :      
      return Object.assign({}, state, action.obj)
    default:
      return state
    }
}

export default userDetails;