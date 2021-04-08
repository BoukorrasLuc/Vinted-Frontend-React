// Import Packages
import { Redirect } from "react-router-dom";

// Import Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileUser = ({ userToken, userAccount, data }) => {
  let username = userAccount.account.username;
  console.log(data.offers);
  console.log(data.offers[0].owner._id); // id du user de l'annonce
  console.log(userAccount._id); // id du user du profile

  const tabUserOffer = [];
  let newtabUserOffer = [...tabUserOffer];

  for (let i = 0; i < data.offers.length; i++) {
    if (userAccount._id === data.offers[i].owner._id) {
      newtabUserOffer.push(data.offers[i]);
    }
  }

  return userToken ? (
    <div className="container-profile">
      <div className="section1">
        <div className="image">
          {userAccount.account.avatar && (
            <img
              className="avatar-img"
              src={userAccount.account.avatar.secure_url}
              alt={userAccount.account.username}
              style={{ borderRadius: "50%", height: "180px" }}
            />
          )}
        </div>

        <div className="profile-section">
          <div>{username}</div>
          <div className="évalutions">
            <FontAwesomeIcon
              icon="star"
              style={{
                height: "15px",
                width: "15px",
                color: "Yellow",
                marginRight: "1px",
              }}
            />
            <FontAwesomeIcon
              icon="star"
              style={{
                height: "15px",
                width: "15px",
                color: "Yellow",
                marginRight: "1px",
              }}
            />
            <FontAwesomeIcon
              icon="star"
              style={{
                height: "15px",
                width: "15px",
                color: "Yellow",
                marginRight: "1px",
              }}
            />
            <FontAwesomeIcon
              icon="star"
              style={{
                height: "15px",
                width: "15px",
                color: "Yellow",
                marginRight: "1px",
              }}
            />
            <FontAwesomeIcon
              icon="star"
              style={{
                height: "15px",
                width: "15px",
                color: "Yellow",
                marginRight: "1px",
              }}
            />
            &nbsp;&nbsp;X évalutions
          </div>

          <div className="A-propos">À propos :</div>
          <div className="info">
            <FontAwesomeIcon
              icon="map-marker-alt"
              style={{ height: "15px", width: "15px", color: "#a2a2a2" }}
            />
            &nbsp;France
          </div>
          <div className="info">
            <FontAwesomeIcon
              icon="clock"
              style={{ height: "15px", width: "15px", color: "#a2a2a2" }}
            />
            &nbsp;Connecté il y a X
          </div>
          <div className="info">
            <FontAwesomeIcon
              icon="rss"
              style={{ height: "15px", width: "15px", color: "#a2a2a2" }}
            />
            &nbsp;X Abonnées, X Abonnement
          </div>
          <div className="biographie">
            Biographie de l'utilisateur Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Enim quaerat quis quasi, earum adipisci iure
            placeat fugiat. Saepe assumenda omnis exercitationem est ex quis,
            quo delectus non, nemo repellendus culpa.
          </div>
        </div>
      </div>

      <div className="offer-section">
        <h1>Vos Annonces</h1>

        {newtabUserOffer.map((offer, index) => {
          return (
            <div key={index} className="offer-card">
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
          );
        })}
      </div>
    </div>
  ) : (
    <Redirect to="/user/login" />
  );
};
export default ProfileUser;
