import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import Header from "../../components/header/Header";
import useAuth from "../../hooks/useAuth";

import "./Signin.scss";
import axios from "../../api/axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cfrmPwd, setCfrmPwd] = useState("");
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(
          "/auth/register",
          {
            name: userName,
            email: email,
            password: pwd,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res.data.stautus);
          if (res.data.stautus == "Success") {
            handleLogin();
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios
        .post(
          "auth/login",
          {
            email: email,
            password: pwd,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          if (res?.data.accessToken) {
            setAuth({
              email,
              accessToken: res?.data.accessToken,
              refreshToken: res?.data.refreshToken,
            });
            navigate(from, { replace: true });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center mt-4">
        <div className="border rounded border-primary d-flex flex-column align-items-center p-3">
          <h4>Đăng nhập</h4>
          <form
            className="d-flex flex-column form-group"
            onSubmit={(event) => handleSignin(event)}
          >
            <title className="my-2">Tên người dùng</title>
            <input
              className="email-input form-control"
              type="text"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              required
            ></input>
            <title className="my-2">Email</title>
            <input
              className="email-input form-control"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            ></input>
            <title className="my-2">Mật khẩu</title>
            <input
              className="pwd-input form-control"
              type="password"
              value={pwd}
              onChange={(event) => {
                setPwd(event.target.value);
              }}
              required
            ></input>
            <title className="my-2">Xác nhận mật khẩu</title>
            <input
              className="pwd-input form-control"
              type="password"
              value={cfrmPwd}
              onChange={(event) => {
                setCfrmPwd(event.target.value);
              }}
              required
            ></input>
            {cfrmPwd && pwd != cfrmPwd && (
              <p className="py-2 m-0 check-pwd-msg">Mật khẩu không khớp</p>
            )}
            <button className="pink-btn my-2 p-1" type="submit">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
