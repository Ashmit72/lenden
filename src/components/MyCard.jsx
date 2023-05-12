import styled from 'styled-components';
import {FcLeftDown} from "react-icons/fc";
import {FcRightUp} from "react-icons/fc";
import db from "../../db.json";




function MyCard() {

  const totalPaidAmount=db.payDetails.reduce(
    (acc,curr)=>acc+parseInt(curr.paidAmount)
    ,0
  );
  const totalRecieveAmount=db.recieveDetails.reduce(
    (acc,curr)=>acc+parseInt(curr.recievedAmount)
    ,0
  );
  

  return (
    <Wrapper >
    <Card>
      <div><FcLeftDown style={{fontSize:"2rem"}} /></div>
    <Title>Recieved</Title>
    <div>Rs.{totalRecieveAmount}</div>
    </Card>
    
    <Card>    
<div><FcRightUp style={{fontSize:"2rem"}} /></div>
<Title>Paid</Title>
<div>Rs.{totalPaidAmount}</div>
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
