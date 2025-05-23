import { JSX, useState } from "react";
import "./register.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { handleRegister } from "../../api/userApi";
import MessageBox from "../../Components/MessageBox/MessageBox";
import LoadingSpinner from "../../Components/Common Components/SmallLoading/Loading";

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [button, setButton] = useState<string | JSX.Element>("Register");
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);
  const shippingAddress = {
    country: "",
    city: "",
    street: "",
    postcode: "",
    county: "",
  };

  const navigate: NavigateFunction = useNavigate();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButton(<LoadingSpinner />);
    setLoading(true);
    setMessage(null);

    if (password !== confPassword) {
      setMessage({ text: "Your passwords do not match.", type: "error" });
      setButton("Register");
      setLoading(false);
      return;
    }

    try {
      await handleRegister({
        firstName,
        surname,
        email,
        phone,
        password,
        shippingAddress,
      }).then((res) => {
        if (res === "duplicate") {
          setMessage({
            text: "User with this email address already exists.",
            type: "error",
          });
        } else if (res === "success") {
          setMessage({
            text: "You have successfully registered your account!",
            type: "success",
          });
        }
        setButton("Register");
        setLoading(false);
      });
    } catch (error) {
      setMessage({
        text: "Failed to register. Please try again.",
        type: "error",
      });
    }
  };

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    e: string
  ) => {
    setState(e);
    setMessage(null);
  };

  return (
    <div className="register-page-container">
      <MessageBox
        message={message?.text || ""}
        type={message?.type || "error"}
      />
      <div className="register-container">
        <div className="register-title">Create your account</div>
        <form onSubmit={register}>
          <TextField
            variant="filled"
            label="First Name"
            type="text"
            required
            value={firstName}
            onChange={(e) => handleChange(setFirstName, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Surname"
            type="text"
            required
            value={surname}
            onChange={(e) => handleChange(setSurname, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => handleChange(setEmail, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Phone Number"
            type="tel"
            required
            value={phone}
            onChange={(e) => handleChange(setPhone, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => handleChange(setPassword, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Confirm Password"
            type="password"
            required
            value={confPassword}
            onChange={(e) => handleChange(setConfPassword, e.target.value)}
          />
          <div
            className={
              firstName === "" ||
              surname === "" ||
              email === "" ||
              password === "" ||
              confPassword === "" ||
              loading
                ? "button-container disabled"
                : "button-container"
            }
          >
            <button type="submit">{button}</button>
          </div>
          <div className="login">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
}
