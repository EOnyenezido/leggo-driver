/*
 * action types
 */
// Set user details
export const SET_USER_DETAILS = 'SET_USER_DETAILS';

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