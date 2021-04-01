// Import Packages
import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://vinted-backend-luc.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          phone: phone,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2 className="title">S'inscrire</h2>
        <div className="username">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="email">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />
          <div className="email-error">{errorMessage}</div>
        </div>
        <div className="phone">
          <input
            type="phone"
            placeholder="Numero de téléphone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="newsletter">
          <div className="checkbox">
            <input className="b-checkbox" type="checkbox" />
            S'inscrire à notre newsletter
          </div>
          <div>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </div>
        </div>
        <button type="submit">S'inscrire</button>
        <Link to="/user/login">
          <span>Tu as déjà compte ? Connecte-toi !</span>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
