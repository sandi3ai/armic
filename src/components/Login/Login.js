import React, { useState } from "react";
import LoginForm from "./LoginForm";
import App from "../../App";

function Login() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin",
  };

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Logged in");
      setUser({
        email: details.email,
      });
    } else {
      setError("\n\nEmail in geslo se ne ujemata!");
      console.log("Email in geslo se ne ujemata!");
    }
  };

  const Logout = () => {
    setUser({ email: "", password: "" });
    console.log("Logout");
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
