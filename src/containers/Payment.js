// Import Packages
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

// Import components
import CheckoutForm from "../components/CheckoutFrom";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51IQZJ7L1GTZzadVNMibfuE2V228DA3HiuW4ifXlcaFSO7g5HQMxDYj7SjJIeMQydN0QUZUvkGRgbDRej04TuM8a200F4jb2DCT"
  );

  //I retrieve the data from the state of History offer
  const location = useLocation();
  const { productName, price, userToken, userId } = location.state;

  return (
    <div className="background-payment">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          productName={productName}
          price={price}
          userToken={userToken}
          userId={userId}
        />
      </Elements>
    </div>
  );
};
export default Payment;
