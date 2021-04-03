// Import Packages
import { Link } from "react-router-dom";

const Home = ({ data, currentPage, postsPerPage, setCurrentPage }) => {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.offers.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(data.offers); // Tableau de 8 object
  // console.log(data);
  console.log(data.offers.length);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.offers.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);

  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <div>
      <div className="home-container">
        {currentPosts.map((offer) => {
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
      <div className="pageNumber">
        {pageNumbers.map((number) => (
          <div key={number} className="pagenumbers">
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
