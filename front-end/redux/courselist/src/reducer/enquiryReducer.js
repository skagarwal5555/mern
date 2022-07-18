const initialState = {
  enquiries: [],
  enquiry: {
    eid: "",
    username: "",
    email: "",
    enquiry: "",
    cid: "",
  },
  successMessage: "",
  errorMessage: "",
};

function enquiryReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_ENQUIRIES_SUCCESS":
      return {
        ...state,
        enquiries: action.enquiries,
      };
    case "CLEAR_MESSAGES_ADD_ENQUIRY":
      return {
        ...state,
        errorMessage: "",
        successMessage: "",
      };
    case "LOAD_ADD_ENQUIRIES_SUCCESS":
      return {
        ...state,
        enquiries: state.enquiries.concat(action.enquiry),
        enquiry: action.enquiry,
        errorMessage: "",
        successMessage: action.enquiry.successMessage,
      };
    case "LOAD_ADD_ENQUIRIES_FAILURE":
      return {
        ...state,
        enquiry: action.enquiry,
        successMessage: "",
        errorMessage: action.enquiry.errorMessage,
      };
    default:
      return state;
  }
}

export default enquiryReducer;
