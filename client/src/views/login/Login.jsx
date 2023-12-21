import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import Header from "../../components/header/Header";
import useAuth from "../../hooks/useAuth";

import "./Login.scss";
import axios from "../../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
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
            onSubmit={handleLogin}
          >
            <title className="my-2">Email</title>
            <input
              className="email-input form-control"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              ref={userRef}
              autoComplete="off"
            ></input>
            <title className="my-2">Mật khẩu</title>
            <input
              className="pwd-input form-control"
              type="password"
              value={pwd}
              onChange={(event) => {
                setPwd(event.target.value);
              }}
              autoComplete="off"
            ></input>
            <button className="pink-btn my-2 p-1" type="submit">
              Đăng nhập
            </button>
          </form>
          <p>
            Chưa có tài khoản? <Link to={"/signin"}>Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
