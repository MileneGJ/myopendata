import logo from "../../assets/logo-no-background.png";
import { AuthContainer, Form } from "./AuthStyles";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signin } from "../../services/auth";
import errorHandler from "../../utils/errorHandler";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function SignIn() {
  const { setUserData } = useContext(UserContext);
  const [authUser, setAuthUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function authenticateUser(e) {
    e.preventDefault();
    try {
      const promise = await signin(authUser);
      localStorage.setItem("token", promise.data.token);
      setUserData(promise.data.user);
      navigate("/home");
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <AuthContainer>
      <img src={logo} alt="" />
      <h1>Easily find and store data online</h1>
      <Form onSubmit={authenticateUser} className="auth">
        <input
          type="email"
          placeholder="Email"
          value={authUser.email}
          onChange={(e) => setAuthUser({ ...authUser, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={authUser.password}
          onChange={(e) =>
            setAuthUser({ ...authUser, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </Form>
      <Link to="/">Do not have an account? Sign up</Link>
    </AuthContainer>
  );
}
