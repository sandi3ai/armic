import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import App from "../../App";

function Login({ setLoggedIn }) {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin",
  };
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    /*useEffect(() => {
      fetch("http://localhost/reactProjects/armic/src/rest/admin_data.php")
        .then((res) => res.json())
        .then(
          (data) => console.log("wow" + data),
          (error) => {
            setError(error);
          }
        );
    }, []);*/
    // ZAKAJ NE MOREM UPORABITI USEEFFECTA TUKAJ? JE ZNOTRAJ FUNKCIJE...

    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Logged in");
      setUser({
        email: details.email,
      });
      setLoggedIn(true);
    } else {
      setError("\n\nUporabniško ime in geslo se ne ujemata!");
    }
  };

  const Logout = () => {
    setUser({ email: "", password: "" });
  };

  return (
    <div>
      {user.email !== "" ? (
        <App Logout={Logout} />
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default Login;
