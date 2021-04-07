// Import Packages
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser, setUserAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

  // we create a function which makes a request to find the user
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://vinted-backend-luc.herokuapp.com/user/login",

        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setUserAccount(response.data);
        history.push("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Mauvais email ou mot de passe");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="title">Se connecter</h2>

      {/* we create a form to retrieve the data we need for authentication */}

      <form onSubmit={onSubmit}>
        <div className="email">
          <input
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
            placeholder="Adresse email"
            type="email"
          />
        </div>
        <div className="password">
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Mot de passe"
          />
        </div>

        <div className="login-error-message">{errorMessage}</div>

        <button type="submit">Se connecter</button>
      </form>
      <Link to="/signup">
        <span>Pas encore de compte ? Inscris-toi !</span>
      </Link>
    </div>
  );
};

export default Login;
