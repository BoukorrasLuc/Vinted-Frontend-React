// Import Packages
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <div className="home-container">
      {data.offers.map((offer) => {
        return (
          <Link
            className="home-offer"
            key={offer._id}
            to={`/offer/${offer._id}`}
          >
            <div>
              <div>
                {offer.owner.account.avatar && (
                  <img
                    className="avatar-img"
                    src={offer.owner.account.avatar.secure_url}
                    alt={offer.owner.account.username}
                  />
                )}
                <span>{offer.owner.account.username}</span>
              </div>

              <img
                className="offer-img"
                src={offer.product_image.url}
                alt={offer.product_name}
              />

              <div className="info-product">
                <span className="price">
                  {offer.product_price.toFixed(2).replace(".", ",")} €
                </span>

                {offer.product_details[1].TAILLE && (
                  <span className="taille">
                    {offer.product_details[1].TAILLE}
                  </span>
                )}
                {offer.product_details[0].MARQUE && (
                  <span className="marque">
                    {offer.product_details[0].MARQUE}
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
