import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import {BiPowerOff} from "react-icons/bi"

function Logout() {
  const navigate = useNavigate();
  const handleClick = async ()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <Button onClick={()=>{handleClick()}}>
      <BiPowerOff/>
    </Button>
  )
}

export default Logout

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  svg{
    font-size: 1.3rem;
    color: #ebe7ff;
  }


` 
