import React, { useState } from 'react';
import styled from 'styled-components';
import LogoImage from "./Logo/lenden.svg"
import {FiHome} from "react-icons/fi";
import {FaRegUser} from "react-icons/fa";
import {BiErrorCircle} from "react-icons/bi";
import { Link } from 'react-router-dom';





function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

 const handleMenuItemClick=()=>{
  if (window.innerWidth<=768) {
    toggleMenu()
  }
 }



  
  return (
    <Nav>
      <Logo> <Link to="/" className="lenden-text" > <img style={{height:"1.5rem"}} src={LogoImage} alt=""  /> LenDen </Link> </Logo>
      <MenuIcon onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </MenuIcon>
      <Menu isOpen={isOpen}>
        <Link to="/" onClick={handleMenuItemClick}  ><MenuItem><FiHome/>Home</MenuItem></Link>
       <Link to="/about" onClick={handleMenuItemClick} > <MenuItem ><BiErrorCircle/>About Us</MenuItem></Link>
        <Link to="/parties" onClick={handleMenuItemClick} ><MenuItem ><FaRegUser/>All Parties</MenuItem></Link>
      </Menu>
    </Nav>
  );
}

export default Navbar;


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3498db;
  color: white;
  padding: 10px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  .lenden-text{
    color:white;
    text-decoration:none;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background-color: #3498db;
    padding: 10px;
    
  }
`;

const MenuItem = styled.div`
  margin-left: 20px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  
  &:hover {
    color: yellow;
  }
  
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;