import styled from 'styled-components';
import {FcLeftDown} from "react-icons/fc";
import {FcRightUp} from "react-icons/fc";
import db from "../../db.json";
import { useState } from 'react';




function MyCard() {


//  const [pay,setPay]=useState(0)
//  const [recieve,setRecieve]=useState(0)

 const payDetails=db.payDetails;
 const recieveDetails=db.recieveDetails;

//  const partyPayDetails= payDetails.flatMap(party=>{
//   const transactions=party.transactions;
//   return transactions.map(transaction=>transaction.amount)
//  })
 

//  const partyRecieveDetails=recieveDetails.flatMap(party=>{
//   const transactions=party.transactions;
//   return transactions.map(transaction=>transaction.amount)
//  })
 

 const totalPartyRecieveAmount = recieveDetails.reduce((acc, party) => {
  const transactions = party.transactions;
  const partyRecieveAmount = transactions.reduce((sum, transaction) => sum + parseInt(transaction.recieveAmount), 0);
  return acc + partyRecieveAmount;
}, 0);

const totalPartyPayAmount = payDetails.reduce((acc, party) => {
  const transactions = party.transactions;
  const partyPayAmount = transactions.reduce((sum, transaction) => sum + parseInt(transaction.payAmount), 0);
  return acc + partyPayAmount;
}, 0);



  

  return (
    <Wrapper >
    <Card>
      <div><FcLeftDown style={{fontSize:"2rem"}} /></div>
    <Title>Recieved</Title>
    <div>Rs.{totalPartyRecieveAmount}</div>
    </Card>
    
    <Card>    
<div><FcRightUp style={{fontSize:"2rem"}} /></div>
<Title>Paid</Title>
<div>Rs.{totalPartyPayAmount}</div>
    </Card>
    
    
    </Wrapper>
  );
}
export default MyCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px 0;
  flex:1;
  gap:1rem;
  transition: 1s ease;
  
  &:hover{
-webkit-transform: scale(0.8);
-ms-transform: scale(0.8);
transform: scale(0.8);
transition: 1s ease;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.div`
  font-size: 24px;
  
`;

const Wrapper =styled.div`
display: flex;
flex-direction: row;
-moz-box-align: center;
align-items: center;
max-width: 82vw;
margin: 0px auto;
gap:3rem;
 @media (max-width:768px){
  max-width:100vw;
  gap:1rem;
 }

`;
