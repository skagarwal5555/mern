import delay from "./delay";

class EnquiryApi {
  static getAllEnquiries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(makeGetAllEnquiriesCall());
      }, delay);
    });
  }

  static addEnquiries(enquiry) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(postAddEnquiry(enquiry));
      }, delay);
    });
  }
}

const makeGetAllEnquiriesCall = async () => {
  try {
    const url = "http://localhost:4000/enquiries";
    const response = await fetch(url, { mode: "cors" });
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const postAddEnquiry = async (enquiry) => {
  try {
    const requestOptions = {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(enquiry),
    };
    console.log("start api call");
    const response = await fetch(
      "http://localhost:4000/enquiries/Add",
      requestOptions
    );
    const errors = await response.json();
    if (!response.ok) {
      //on error
      let errorData = [];
      for (const error of errors.errors) {
        errorData.push(error["msg"]);
      }
      enquiry.errorMessage = "All Fields are Mandatory";
      enquiry.successMessage = "";
      return enquiry;
    } else {
      //on success
      enquiry.errorMessage = "";
      enquiry.successMessage = "Enquiry Saved Successfully";
      console.log("On success:" + enquiry);
      return enquiry;
    }
  } catch (e) {
    console.log(e);
  }
};

export default EnquiryApi;
