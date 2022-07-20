class UserInfoApi {
  static getAllUserInfo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(makeAPICall());
      }, 100);
    });
  }
}

const makeAPICall = async () => {
  try {
    const API_HOST = "http://localhost:3000";
    const USERLIST_API_URL = `${API_HOST}/userInfo`;
    const response = await fetch(`${USERLIST_API_URL}`);
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default UserInfoApi;
