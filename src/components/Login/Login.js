import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import App from "../../App";
import useLazyApi from "../../hooks/useLazyApi";
import useApi from "../../hooks/useApi";

function Login({ setLoggedIn }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const doLogin = useLazyApi(
    "http://localhost/reactProjects/armic/src/rest/login.php"
  );
  const checkLogin = useApi(
    "http://localhost/reactProjects/armic/src/rest/check_login.php"
  );
  const doLogout = useLazyApi(
    "http://localhost/reactProjects/armic/src/rest/logout.php"
  );
  function login(details) {
    doLogin(details).then((result) => {
      if (result.adminID > -1) {
        setLoggedIn(true);
        console.log("adminID: " + result.adminID);
      } else {
        setError("Napačni prijavni podatki");
      }
    });
  }
  function Logout() {
    setUser({ email: "", password: "" });
    console.log("Login.js function Logout()");
    doLogout();
  }

  useEffect(() => {
    if (checkLogin && checkLogin.data && checkLogin.data.adminID > 0) {
      setLoggedIn(true);
    }
  }, [checkLogin]);
  return (
    <div>
      {user.email !== "" ? <App /> : <LoginForm Login={login} error={error} />}
    </div>
  );
}

export default Login;
