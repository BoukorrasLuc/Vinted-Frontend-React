// Import Packages
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ productName, price, userToken, userId }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // Calculation of ad total
  let BuyerProtectionFees = Number(price * (5 / 100));
  let ShippingFees = 1.6;
  let total = Number(price) + ShippingFees + BuyerProtectionFees;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Here we retrieve the bank data that the user enters
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });

      const response = await axios.post(
        "https://vinted-backend-luc.herokuapp.com/payment",
        {
          amount: total,
          title: productName,
          token: stripeResponse.token.id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data) {
        setIsPaid(true);
      } else {
        alert("An error has occured, please try again.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="CheckoutForm-compoment" onSubmit={handleSubmit}>
      <span>Résumé de la commande</span>

      <div>
        <div>
          <span>commande</span>
          <span>{price.toFixed(2).replace(".", ",")}&nbsp;€</span>
        </div>
        <div>
          <span>Frais protection acheteurs</span>
          <span>{BuyerProtectionFees.toFixed(2).replace(".", ",")}&nbsp;€</span>
        </div>
        <div>
          <span>frais de port</span>
          <span>{ShippingFees.toFixed(2).replace(".", ",")}&nbsp;€</span>
        </div>
      </div>
      <div className="section-total">
        <span className="total">Total</span>
        <span>{total.toFixed(2).replace(".", ",")}&nbsp;€</span>
      </div>

      <div className="section-description">
        Il ne vous reste plus qu'une étape pour vous offrir
        <span
          style={{
            color: "#09B1BA",
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          &nbsp;{productName}
        </span>
        . Vous allez payer
        <span
          style={{
            color: "#09B1BA",
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          &nbsp;{total.toFixed(2).replace(".", ",")}&nbsp;€
        </span>
        &nbsp;(frais de protection et frais de port inclus).
      </div>

      {isPaid ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Merci pour votre achat.
        </div>
      ) : (
        <>
          <CardElement className="CardElement" />
          <button type="submit" disabled={!stripe}>
            Payer
          </button>
        </>
      )}
    </form>
  );
};

export default CheckoutForm;
