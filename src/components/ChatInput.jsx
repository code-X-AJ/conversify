  import React, { useEffect, useState } from "react";
  import styled from "styled-components";
  import EmojiPicker from "emoji-picker-react";
  import { IoMdSend } from "react-icons/io";
  import { BsEmojiSmileFill } from "react-icons/bs";

  function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPicker = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };

    const sendChat = (event)=>{
      event.preventDefault();
      if (msg.length> 0){
        handleSendMsg(msg);
        setMsg('');
      }
    }

    const handleEmojiClick = (event, emojiObject) => {
      let message = msg;
      message += event.emoji;
      setMsg(message);
    };

    return (
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPicker} />
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className="input-container" onSubmit={(event)=>sendChat(event)}>
          <input
            type="text"
            placeholder="type your message here"
            onChange={(e) => {setMsg(e.target.value)}}
            value={msg}
          />
          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    );
  }

  export default ChatInput;

  const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    padding: 0 1.5rem;
    background-color: #080420;

    .button-container {
      padding: 0 0.5rem;
      .emoji {
        position: relative;
        svg {
          font-size: 1.5rem;
          color: yellow;
          cursor: pointer;
        }
        .EmojiPickerReact {
          position: absolute;
          top: -460px;
          background-color: #080420;
          box-shadow: 0 2px 5px #9a86f3;
          border-color: #9186f3;
          .epr-body::-webkit-scrollbar {
            background-color: #080420;
            width: 10px;
            &-thumb {
              border-radius: 4px;
              background-color: #9186f3;
            }
          }
          .epr_-orqfm8 {
            background-color: transparent;
            // background-color: #fff;
            border-color: #9186f3;
          }
          .epr_-6dchwm {
            position: relative;
          }

          .epr-emoji-category-label {
            background-color: transparent;
          }
        }
      }
    }

    .input-container {
      width: 100%;
      display: flex;
      border-radius: 2rem;
      background-color: #ffffff34;
      gap: 2rem;
      align-items: center;
      input {
        width: 90%;
        outline: none;
        border: none;
        background-color: transparent;
        color: white;
        padding-left: 1rem;
        font-size: 1.2rem;
      }
      button {
        padding: 0.3rem 2rem;
        background-color: #9a86f3;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        svg {
          color: white;
          font-size: 2rem;
        }
      }
      button:hover {
        background-color: #8f7ce0;
      }
    }
  `;
