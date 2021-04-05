//Import Packages
import { Link } from "react-router-dom";

// Import Images
import heroBanner from "../assets/images/hero-banner.jpeg";
import tear from "../assets/images/tear.svg";

const Hero = () => {
  return (
    <div className="hero-banner">
      <img className="hero-img" src={heroBanner} alt="Banner" />
      <img className="effect-img" src={tear} alt="Banner-effect" />
      <div>
        <div>
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <Link className="btn-vendre" to="/user/publish">
            Commencer à vendre
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
