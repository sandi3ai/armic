import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import App from "../../App";
import useLazyApi from "../../hooks/useLazyApi";
import useApi from "../../hooks/useApi";

function Login({ setLoggedIn }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  //const [isLoading, setIsLoading] = useState(false);
  const doLogin = useLazyApi(
    "http://localhost/reactProjects/armic/src/rest/login.php"
  );
  const checkLogin = useApi(
    "http://localhost/reactProjects/armic/src/rest/check_login.php"
  );
  /*const doLogout = useApi(
    "http://localhost/reactProjects/armic/src/rest/logout.php"
  );*/
  function login(details) {
    doLogin(details).then((res) => {
      if (res.adminID > -1) {
        setLoggedIn(true);
      } else {
        setError("Napačni prijavni podatki");
      }
    });
  }
  const Logout = () => {
    setUser({ email: "", password: "" });
    //doLogout();
  };

  useEffect(() => {
    console.log(checkLogin);
    if (checkLogin && checkLogin.data && checkLogin.data.adminID > 0) {
      setLoggedIn(true);
    }
  }, [checkLogin]);
  return (
    <div>
      {user.email !== "" ? (
        <App Logout={Logout} />
      ) : (
        <LoginForm Login={login} error={error} />
      )}
    </div>
  );
}

export default Login;
