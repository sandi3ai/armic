import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import useLazyApi from "../../hooks/useLazyApi";
import useApi from "../../hooks/useApi";

function Login({ setLoggedIn }) {
  const [error, setError] = useState("");
  const doLogin = useLazyApi(
    `${process.env.REACT_APP_BASE_URL}/src/rest/login.php`
  );
  const checkLogin = useApi(
    `${process.env.REACT_APP_BASE_URL}/src/rest/check_login.php`
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

  useEffect(() => {
    if (checkLogin && checkLogin.data && checkLogin.data.adminID > 0) {
      setLoggedIn(true);
    }
  }, [checkLogin]);
  return (
    <div>
      <LoginForm Login={login} error={error} />
    </div>
  );
}

export default Login;
