import initialState from "./initialState";
function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case "LOAD_COURSES_SUCCESS":
      return action.courses;
    default:
      return state;
  }
}

export default courseReducer;
