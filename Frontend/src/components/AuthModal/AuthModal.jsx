import { Button, Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./AuthModal.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ setShowModal }) => {

  const {backendUrl, setUserToken} = useContext(AuthContext);
  const [status, setStatus] = useState("LogIn");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email:"",
    password:""
  });

  const OnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData(data=>({...data,[name]:value}))
  }

  const Login = async (e) => {
    e.preventDefault();

    let url = backendUrl;
    if(status === "LogIn"){
      url+="/api/user/login";
    } else {
      url+="/api/user/register";
    }
    const response = await axios.post(url, userData);

    if(response.data.success){
      setUserToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowModal(false);
      navigate('/');
      window.location.reload();
    } else {
      alert(response.data.message);
    }
  }  

  return (
    <div className="main-modal-container">
      <div className="modal-container">
        <form onSubmit={Login}>
          <div className="form-title">
            <Typography variant="h6" align="center">
              {status === "SignUp" ? "SignUp" : "Login"}
            </Typography>
            <CloseIcon
              className="closeimg"
              onClick={() => {
                setShowModal(false);
              }}
            />
          </div>
          <div className="form-fields">
            {status === "SignUp" ? (
              <input name='name' required='true' onChange={OnChange} value={userData.name} type="name" placeholder="Enter your name..." />
            ) : (
              <></>
            )}

            <input name='email' required='true' onChange={OnChange} value={userData.email} type="email" placeholder="Enter your email..." />
            <input name='password' required='true' onChange={OnChange} value={userData.password} type="password" placeholder="Enter password..." />
          </div>
          <Button type='submit' className="auth-button" variant="contained">
            {status === "SignUp" ? "SignUp" : "Login"}
          </Button>
          <div className="auth-status">
            {status === "SignUp" ? (
              <Typography
                onClick={() => {
                  setStatus("LogIn");
                }}
              >
                Already have an account? <span>Login</span>
              </Typography>
            ) : (
              <Typography
                onClick={() => {
                  setStatus("SignUp");
                }}
              >
                Create new account? <span>Click here</span>
              </Typography>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
