import { useState } from "react";
import "./login.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { handleLogin } from "../../api/api";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    e: string
  ) => {
    setState(e);
    setMessage(null);
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await handleLogin(email, password).then((res) => {
        if (res === "success") {
          navigate("/");
          window.location.reload();
        } else {
          setMessage({
            text: "Email or password do not match.",
            type: "error",
          });
        }
      });
    } catch (error) {}
  };

  return (
    <div className="login-page-container">
      <MessageBox
        message={message?.text || ""}
        type={message?.type || "error"}
      />
      <div className="login-container">
        <div className="login-title">Login to your account</div>
        <form onSubmit={login}>
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
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => handleChange(setPassword, e.target.value)}
          />
          <div
            className={
              email === "" || password === ""
                ? "button-container disabled"
                : "button-container"
            }
          >
            <button type="submit">Login</button>
          </div>
          <div className="login">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </div>
        </form>
      </div>
    </div>
  );
}
