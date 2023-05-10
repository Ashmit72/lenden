import React, { useState } from 'react'
import MyCard from '../MyCard'
import styled from 'styled-components'
import { FcBusinessman } from "react-icons/fc";
import Button from '../Button';
import { Link } from 'react-router-dom';





export default function ContactPage() {

  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible)
  }

  
const mediaMatch = window.matchMedia('(max-width: 768)');
const partiesContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "none",
  flexDirection: mediaMatch ? "column" : "row"
}
const partiesListStyle = {
boxShadow: "2px 2px 4px #eaeaea",
width:"85%"

}
const partiesFormStyle = {
  boxShadow: "2px 2px 4px #eaeaea"
}

  return (
    <div>
      <MyCard />
      <Container2 style={partiesContainerStyle}>
        <Contentbox1 style={partiesListStyle}>
          <h1>Parties List!!</h1>
          <ul>
            <Link to="/party" >
            <List>Party 1</List>
            </Link>
            
            <Link to="/party" >
            <List>Party 2</List>
            </Link>
            
            <Link to="/party" >
            <List>Party 3</List>
            </Link>
            
          </ul>
        </Contentbox1>
        <Contentbox2 style={partiesFormStyle}>
          <p onClick={handleToggle} ><FcBusinessman />Add New Party</p>
          <Content visible={visible} >
            <Input placeholder='Name' type="text" />
            <Input placeholder='Phone Number' type="number" />
            <Input placeholder='Adress' type="text" />
            <Button>Add Party</Button>
          </Content>
        </Contentbox2>
      </Container2>
    </div>
  )
}





const Container2 = styled.div`
display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  align-items: center;
  justify-content:space between
  width:90%;
  align-items:center;
  padding: 20px;
  background-color: #fff;
  transition: background-color 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media (max-width: 768px) {
    padding: 10px;
    max-width: 90vw;
    margin-left:0.6rem;
  }
`;
const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;

  &:focus {
    outline: none;
    border-color: #1E90FF;
    box-shadow: 0px 0px 4px rgba(30, 144, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
    margin-bottom: 10px;
  }
`;
const Contentbox2=styled.div`
width:85%;
@media (max-width:768px){
  width:100%
}
`;
const Contentbox1=styled.div`
width:85%;
`;
const Content = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: ${({ visible }) => visible ? 'block' : 'none'};
  }
`;

const List=styled.li`
border-bottom:0.25px solid gray;

`;