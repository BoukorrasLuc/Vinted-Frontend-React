// Import Packages
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

const Offer = ({ userToken }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  //We make a request to retrieve the data of offers
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
    <Loader
      type="Oval"
      color="21adb6"
      height={100}
      width={100}
      timeout={3000} //3 secs
      className="loader"
    />
  ) : (
    <div className="background-offer">
      <div className="offer-container">
        <img src={data.product_image.url} alt={data.product_name} />
        <div>
          <div className="price">
            {data.product_price.toFixed(2).replace(".", ",")} €
          </div>

          {/* we perform a .map to display the details of the offers */}

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
