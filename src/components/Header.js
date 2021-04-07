//Import Packages
import PriceRange from "./PriceRange";
import { Link } from "react-router-dom";

//Import Logo
import Vinted from "../assets/images/Vinted_logo.png";

const Header = ({
  setUser,
  userToken,
  setSearchInput,
  setFetchRangeValues,
}) => {
  return (
    <header>
      <Link to="/">
        <img src={Vinted} alt="Logo Vinted" />
      </Link>
      <div className="search-bar">
        <input
          className="search"
          type="search"
          placeholder="Rechercher ..."
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>

      <PriceRange setFetchRangeValues={setFetchRangeValues} />

      <div className="btn-header">
        {userToken ? (
          <div>
            <Link className="btn-profile" to="/user">
              Profile
            </Link>
            <button className="btn-deconnecter" onClick={() => setUser(null)}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <div>
            <Link className="btn-connecter" to="/user/login">
              Se connecter
            </Link>
            <Link className="btn-inscrire" to="/signup">
              S'inscrire
            </Link>
          </div>
        )}
        <Link className="btn-vendre" to="/user/publish">
          Vends tes articles
        </Link>
      </div>
    </header>
  );
};

export default Header;
