import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";

function SetAvatar() {
  const api = "https://api.multiavatar.com/456789";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    theme: "dark",
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  });

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select avatars", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImgSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fetchingData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      return data;
    }
    fetchingData()
      .then((dataArray) => {
        setAvatars(dataArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="submit-btn"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  .loader {
    max-inline-size: 100%;
  }
  gap: 1.5rem;

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 3rem;
    .avatar {
      display: flex;
      padding: 0.5rem;
      border: 0.35rem solid transparent;
      border-radius: 5rem;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;

      :hover {
        transform: scale(1.1);
        transition: 0.2s ease-in-out;
      }
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.35rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;
