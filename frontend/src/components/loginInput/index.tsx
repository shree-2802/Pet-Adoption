import React, { useEffect, useState } from "react";
import { inputText } from "../../constants/loginInput";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setuser, userSliceType, userType } from "../../redux/slice/login";
import { alertpop } from "../../utils/sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, postUser, sendMail } from "../../redux/actions";

export type LoginInputType = {
  accAccess: "Login" | "SignUp";
  setAccAccess: React.Dispatch<React.SetStateAction<"Login" | "SignUp">>;
};
export type handleChangeType = (text: string, type: string) => void;
const LoginInput: React.FC<LoginInputType> = ({ accAccess, setAccAccess }) => {
  let inputFields = inputText;
  const [sign, setSign] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState<number | null>();
  const [isAuth, setisAuth] = useState(false);
  const users: userType[] = useSelector<RootState>(state => state.user.users) as userType[];
  const loggedInUser: userType = useSelector<RootState>(state => state.user.loggedInUser) as userType;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = useParams();

  const handleChange: handleChangeType = (text, type) => {
    if (type === "mail") {
      setMail(text);
    } else if (type === "password") {
      setPassword(text);
    }
    else if (type === "number") {
      setNumber(parseInt(text))
    }
    else {
      setName(text);
    }
  };
  if (accAccess === "Login")
    inputFields = inputText.filter((item, ind) => ind !== 1 && ind !== 3);
  const handleAccessAccount = () => {
    if (accAccess === "Login") {
      setAccAccess("SignUp");
      setSign("SignIn");
    } else {
      setAccAccess("Login");
      setSign("SignUp");
    }
  };

  const handleSubmit = () => {
    if (accAccess === 'Login') {
      let isAuthenticated = false;
      users.forEach(user => {
        if (user.email === mail && password === user.password) {
          dispatch(setuser(mail))
          isAuthenticated = true;
          setisAuth(true);
          dispatch(sendMail({ mail: user.email, type: 'loggedin' }))
          return;
        }
      })
      alertpop(isAuthenticated)
    }
    else {
      if (number) {
        dispatch(postUser({ email: mail, phone: number, password: password, name: name }))
        dispatch(sendMail({ mail: mail, type: 'signedup' }))
      }
      setMail(""); setName(""); setNumber(null); setPassword("");
    }
  }

  useEffect(() => {
    dispatch(getUsers());
    if (loggedInUser) {
      if (isAuth) {
        if (loggedInUser.role === "admin") {
          navigate("/admin/home");
        }
        else if (loggedInUser.role === "user") {
          navigate("/user/home")
        }
        else if (loggedInUser.role === 'doctor') {
          navigate('/doctor/home');
        }
      }
    }
  }, [loggedInUser, isAuth])
  useEffect(() => {
    if (accAccess === "Login") {
      setSign("SignUp");
    } else {
      setSign("SignIn");
    }
  }, []);
  return (
    <div className="login_page-content_input_cont">
      <h1>LOGIN PAGE</h1>
      <div className="login_page-content_input_cont-container">
        {inputFields.map((content, index) => {
          return (
            <div key={content.placeholder}>
              <content.icon />
              <input
                placeholder={content.placeholder}
                type={content.type}
                onChange={(e) => handleChange(e.target.value, content.type)}
              />
            </div>
          );
        })}
      </div>
      <div className="button_section">
        <a style={{ cursor: "pointer" }} onClick={handleAccessAccount}>
          {sign}
        </a>
        <button onClick={handleSubmit} style={{ cursor: 'pointer' }}>submit</button>
      </div>
    </div>
  );
};

export default LoginInput;
