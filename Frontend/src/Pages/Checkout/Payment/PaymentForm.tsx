import "./paymentform.css";
import { FormControl, TextField } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { createOrder } from "../../../api/ordersApi";
import { CreateOrderRequest, OrderStatus } from "../../../Context/Order";
import { CartContextType } from "../../../Context/CartInterface";
import { CartContext } from "../../../Context/Cart";
import { NavigateFunction, useNavigate } from "react-router-dom";
import MessageBox from "../../../Components/MessageBox/MessageBox";
import { processPayment } from "../../../api/paymentApi";

declare global {
  interface Window {
    Accept: {
      dispatchData: (
        data: {
          authData: {
            clientKey: string;
            apiLoginID: string;
          };
          cardData: {
            cardNumber: string;
            month: string;
            year: string;
            cardCode: string;
          };
        },
        callback: (response: {
          messages: {
            resultCode: string;
            message: { text: string }[];
          };
          opaqueData?: {
            dataValue: string;
          };
        }) => void
      ) => void;
    };
  }
}

interface Props {
  userId?: string;
  totalAmount: number;
  firstName: string;
  surname: string;
  phone: string;
  email: string;
  shippingInfo: {
    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    street: string;
    setStreet: React.Dispatch<React.SetStateAction<string>>;
    county: string;
    setCounty: React.Dispatch<React.SetStateAction<string>>;
    apartment: string;
    setApartment: React.Dispatch<React.SetStateAction<string>>;
    postcode: string;
    setPostcode: React.Dispatch<React.SetStateAction<string>>;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
  };
  shipping: number;
}

export default function PaymentForm(props: Props) {
  const { clearCart } = useContext<CartContextType>(CartContext);

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { cartItems } = useContext<CartContextType>(CartContext);

  const route: NavigateFunction = useNavigate();

  // HANDLE PAYMENT AND CREATE ORDER
  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    if (
      props.firstName === "" ||
      props.surname === "" ||
      props.shippingInfo.country === "" ||
      props.shippingInfo.street === "" ||
      props.shippingInfo.city === "" ||
      props.shippingInfo.postcode === "" ||
      props.phone === ""
    ) {
      setIsProcessing(false);
      setError("Billing details are missing.");
    } else {
      try {
        const clientKey = import.meta.env.VITE_CLIENT_KEY;
        const apiLoginID = import.meta.env.VITE_API_LOGIN_ID;

        if (!clientKey || !apiLoginID) {
          throw new Error("API credentials are missing.");
        }

        const authData = {
          clientKey: clientKey,
          apiLoginID: apiLoginID,
        };

        // Validate expiry format
        if (!expiry.includes("/")) {
          throw new Error("Invalid expiry format. Please use MM/YY format.");
        }

        const [month, year] = expiry.split("/");

        if (!month || !year) {
          throw new Error("Invalid expiry format. Please use MM/YY format.");
        }

        const cardData = {
          cardNumber,
          month,
          year,
          cardCode: cvc,
        };

        if (!window.Accept) {
          throw new Error("Accept.js library not loaded");
        }

        window.Accept.dispatchData(
          { authData, cardData },
          async (acceptResponse) => {
            try {
              if (acceptResponse.messages.resultCode === "Error") {
                const errorMsg = acceptResponse.messages.message[0].text;
                setError(errorMsg);
                console.error("Error:", errorMsg);
                setIsProcessing(false);
                return;
              }

              if (!acceptResponse.opaqueData) {
                setError("No payment token received");
                console.error("Unexpected error: No token received");
                setIsProcessing(false);
                return;
              }

              const paymentResult = await processPayment(
                acceptResponse,
                props.totalAmount
              );

              setIsProcessing(false);

              if (paymentResult.success) {
                // Create the order object
                const newOrder: CreateOrderRequest = {
                  ...(props.userId && { userId: props.userId }),
                  ...(!props.userId && {
                    guestInfo: {
                      firstName: props.firstName,
                      surname: props.surname,
                      phoneNumber: props.phone,
                      email: props.email,
                    },
                  }),
                  totalAmount: props.totalAmount + props.shipping,
                  paymentId: paymentResult.transactionId,
                  items: cartItems.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    slug: item.slug,
                  })),
                  shippingAddress: props.shippingInfo,
                  status: OrderStatus.PAID,
                };

                await createOrder(newOrder);

                clearCart();

                route("/order-success", {
                  state: {
                    cartItems: cartItems,
                    shippingFee: props.shipping,
                    totalAmount: props.totalAmount,
                  },
                });
              }
            } catch (error: any) {
              setError(error.message || "Payment processing failed");
              console.error("Payment processing error:", error);
              setIsProcessing(false);
            }
          }
        );
      } catch (error: any) {
        setError(error.message || "Payment submission failed");
        console.error("Payment submission error:", error);
        setIsProcessing(false);
      }
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length === 1 && Number(value) > 1) {
      value = `0${value}`;
    }

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }

    setExpiry(value);
  };

  return (
    <FormControl fullWidth onSubmit={handlePayment} component="form">
      <div className="card-number">
        <TextField
          variant="standard"
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          required
          disabled={isProcessing}
        />
      </div>
      <div className="month-cvc">
        <TextField
          variant="standard"
          label="Expiry (MM/YY)"
          placeholder="MM/YY"
          value={expiry}
          onChange={handleExpiryChange}
          required
          disabled={isProcessing}
        />

        <TextField
          variant="standard"
          label="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 4,
          }}
          required
          disabled={isProcessing}
        />
      </div>

      <button className="order" type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Place Order"}
      </button>
      <div className="error">
        {error && <MessageBox message={error} type="error" />}
      </div>
    </FormControl>
  );
}
