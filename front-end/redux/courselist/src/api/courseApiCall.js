import delay from "./delay";

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(makeAPICall());
      }, delay);
    });
  }
}

const makeAPICall = async () => {
  try {
    const url = "http://localhost:4000/courselist";
    const response = await fetch(url, { mode: "cors" });
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default CourseApi;
