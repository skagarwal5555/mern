import courseApi from "../api/courseApiCall";
import EnquiryApi from "../api/enquiryApiCall";

export function loadCoursesSuccess(courses) {
  return { type: "LOAD_COURSES_SUCCESS", courses };
}

export function loadEnquiriessSuccess(enquiries) {
  return { type: "LOAD_ENQUIRIES_SUCCESS", enquiries };
}

export function loadAddEnquiriessSuccess(enquiry) {
  return { type: "LOAD_ADD_ENQUIRIES_SUCCESS", enquiry };
}

export function loadAddEnquiriessFailure(enquiry) {
  return { type: "LOAD_ADD_ENQUIRIES_FAILURE", enquiry };
}

export function clearMessagesOnAddEnquirt() {
  return { type: "CLEAR_MESSAGES_ADD_ENQUIRY" };
}

export function callLoadCourses() {
  return function (dispatch) {
    return courseApi
      .getAllCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function callLoadEnquiries() {
  return function (dispatch) {
    return EnquiryApi.getAllEnquiries()
      .then((enquiries) => {
        dispatch(loadEnquiriessSuccess(enquiries));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function callAddEnquiry(enquiry) {
  return function (dispatch) {
    return EnquiryApi.addEnquiries(enquiry)
      .then((enquiry) => {
        console.log(enquiry.errorMessage);
        if (enquiry.errorMessage === "") {
          dispatch(loadAddEnquiriessSuccess(enquiry));
        } else {
          dispatch(loadAddEnquiriessFailure(enquiry));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}
