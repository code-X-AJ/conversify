import React from 'react'
import Robot from '../assets/robot.gif'
import styled from 'styled-components'

export default function Welcome({currentUser}) {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>Welcome, <span>{currentUser.username}!</span></h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 20rem;
  }
  h1{
    font-size: 35px;
  }
  h3{
    font-size: 20px;
  }
  span{
    color: #4e00ff;
  }
`;

