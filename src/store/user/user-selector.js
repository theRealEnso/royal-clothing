export const selectCurrentUser = (state) => state.user.currentUser;

//currentUser initializes as null

// using this function together with the useSelector hook in the components that need it (such as the navigation component). This is how we extract off the values that we need from the entire redux store => useSelector needs a selector function

  //inside the selector function, we always receive the ENTIRE state object of the redux store => from the entire state object in the redux store, we nest deeper to get the user reducer (user key contains userReducer), and then even further deeper to get the actual currentUser object. Reminder that currentUser is the initial state value variable defined in the user reducer file
