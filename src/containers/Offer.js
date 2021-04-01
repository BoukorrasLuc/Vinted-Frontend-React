// Import Packages
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = ({ userToken }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  //request who retrieves the data from the offer
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-backend-luc.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <div className="background-offer">
      <div className="offer-container">
        <img src={data.product_image.url} alt={data.product_name} />
        <div>
          <div className="price">
            {data.product_price.toFixed(2).replace(".", ",")} €
          </div>
          {data.product_details.map((elem, index) => {
            return (
              <div className="info-product" key={index}>
                <div>
                  <span className="object">{Object.keys(elem)[0]}</span>
                </div>
                <div>
                  <span className="elem">{elem[Object.keys(elem)[0]]}</span>
                </div>
              </div>
            );
          })}
          <div className="info-product-seller">
            <div className="info-seller">{data.product_name}</div>
            <div className="info-products">{data.product_description}</div>
            <div className="info-sellers">
              {data.owner.account.avatar && (
                <img
                  className="avatar-img"
                  src={data.owner.account.avatar.secure_url}
                  alt={data.owner.account.username}
                />
              )}
              <span>{data.owner.account.username}</span>
            </div>
            <div>
              <button
                onClick={() => {
                  if (userToken) {
                    //Send this data to payment container
                    history.push("/payment", {
                      userId: data.owner._id,
                      productName: data.product_name,
                      price: data.product_price,
                      userToken: userToken,
                    });
                  } else {
                    history.push("/user/login");
                  }
                }}
              >
                Acheter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
