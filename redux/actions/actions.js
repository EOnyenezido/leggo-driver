/*
 * action types
 */
// Set user details
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
// Set watch location
export const SET_WATCH_LOCATION = 'SET_WATCH_LOCATION';
/*
 * other constants
 */

/*
 * action creators
 */
// Set user details
export const setUserDetails = (obj) => {
  return { type: SET_USER_DETAILS, obj }
}
// Set watch location
export const setWatchLocation = (obj) => {
  return { type: SET_WATCH_LOCATION, obj }
}