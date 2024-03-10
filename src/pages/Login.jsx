import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    theme: "dark",
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    const { username, password } = values;
    if (password === "") {
      toast.error("Username is required!", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Username is required!", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.oldUser));
        navigate("/");
      }
    }
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Conversify</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #131324;
  gap: 1rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      text-transform: uppercase;
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 3rem 4rem;
    border-radius: 2rem;
    input {
      background-color: transparent;
      border-radius: 0.5rem;
      color: white;
      width: 100%;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      font-size: 1rem;
      transition: 0.2s ease-in-out;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      padding: 1rem 2rem;
      text-transform: uppercase;
      font-weight: bold;
      color: white;
      background-color: #997af0;
      border-radius: 0.5rem;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      transition: 0.25s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        text-decoration: none;
        color: #4e0eff;
      }
    }

  }
  @media screen and (max-width: 270px) {
    .brand{
      flex-direction: column;
  }
    
  }
  @media screen and (min-width: 0px) and (max-width: 437px) {
    form {
      padding: 0rem 0rem;
      background-color: inherit;
      gap: 1.5rem;
      width: 75%;
      margin: auto;
      .brand {
        gap: 0.8rem;
        h1 {
          font-size: 1.76rem;
        }
        img {
          height: 4rem;
        }
      }
      button {
        font-size: 0.94rem;
      }
      span {
        font-size: 14.5px;
        text-align: center;
      }
    }
  }
`;

export default Login;
