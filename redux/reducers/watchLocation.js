import { SET_WATCH_LOCATION } from "../actions/actions";

const initialState = {remove: () => {}};

const watchLocation = ( state = initialState, action ) => {
  switch (action.type) {
    case SET_WATCH_LOCATION :      
      return Object.assign({}, state, action.obj)
    default:
      return state
    }
}

export default watchLocation;