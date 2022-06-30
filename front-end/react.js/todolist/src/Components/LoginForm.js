import React,{ useEffect, useState } from "react";
import "../App.css";

const users = [
  {
    username: 'admin',
    email: 'admin@yahoo.com',
    password: '12345678'
  },
  {
    username:'user',
    email: 'user@gmail.com',
    password:'012345678'
  }
];

function LoginForm(props) {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    successMessage: ''
  });

  const changeHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const checkUser = () => {
    
    if(data.username === '' || data.email === '' || data.password === '')
    {
        console.log("All Fields are mandatory");
        props.showError("All Fields are mandatory");
    }
    else
    {
        const usercheck = users.find(user => (user.username === data.username && user.password === data.password));
        if(usercheck) {
            console.log("Login successful");
            setData(prevState => ({
                ...prevState,
                'successMessage' : 'Welcome '+ data.username
            }))
            props.showError(null)
        }
        else 
        {
            props.showError("Wrong password or username or email");
            console.log("Wrong password or username or email");
            setData(prevState => ({
                ...prevState,
                'successMessage' : ''
            }))
        }
    }
  }


  useEffect(() => {
        console.log(data);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    setData({
    username: '',
    email: '',
    password: '',
    successMessage: ''}
    )
  }

  return (
    <div className="container">
      <div style={{display: data.successMessage ? 'none' : 'block' }}>
        <p><h1>Login Form</h1></p>
        <br></br>
          <div className="input">
                  <input
                    type="text"
                    name="username"
                    value={data.username}
                    placeholder="Username"
                    onChange={changeHandler}
                  />
              </div>
              <div className="input">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="Email"
                    onChange={changeHandler}
                  />
              </div>
              <div className="input">
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                  onChange={changeHandler}
                />           
              </div>
          </div>
          <div className="alert alert-success mt-2" style={{display: data.successMessage ? 'block' : 'none' }} role="alert">
                {data.successMessage}
            </div>
          <div className="buttons" >
              <button type="submit" class="btn btn-warning" style={{display: data.successMessage ? 'none' : 'block' }} 
                  onClick={handleSubmit}>
                Login
              </button>
              <button type="submit" class="btn btn-warning" 
              style={{display: data.successMessage ? 'block' : 'none' }} onClick={handleLogOut}>
                LogOut
              </button>
          </div>
    </div>
  );
}


export default LoginForm;