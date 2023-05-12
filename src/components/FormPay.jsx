import React, { useRef,useState } from 'react';
import styled from 'styled-components';
import db from "../../db.json";
import { addUserPayDetails } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';



function FormPay() {
  const [name,setName]=useState('');
  const [date,setDate]=useState('');
  const [pay,setPay]=useState('');
  const [due,setDue]=useState('');
  const [desc,setDesc]=useState('');
  const dateRef = useRef();
  const dispatch=useDispatch();
  
  
  const handleNameChange=(event)=>{
    setName(event.target.value);
  }
  const handleDateChange=(event)=>{
    setDate(event.target.value);
  }
  const handlePayChange=(event)=>{
    setPay(event.target.value);
  }
  const handleDueChange=(event)=>{
    setDue(event.target.value);
  }
  const handleDescChange=(event)=>{
    setDesc(event.target.value);
  }
  
  const handleSubmit= async (event)=>{
    event.preventDefault();
  s
    const partiesName=db.parties.map((party)=>{
      return(
        party.name
      )
    })
  
    if (partiesName.indexOf(name) <0) {

      return alert(`Please enter the Valid Name. This User Doesnot exist!!!!`);
    }
    
    const payDetailsObject={
      partyName:name,
      paidDate:date,
      paidAmount:pay,
      dueAmount:due,
      description:desc,
    };

    try{
      await axios.post("http://localhost:5179/payDetails",payDetailsObject) 
      dispatch(addUserPayDetails({partyName:name,paidDate:date,paidAmount:pay,dueAmount:due,description:desc}))
      setName('');
      setDate('');
      setPay('');
      setDue('');
      setDesc('');
      return alert(`Payed Successfully!!}`);
    }
    catch(err){
      console.log(err.message);
    }

  }


  return (
    <Container onSubmit={handleSubmit}>
      <Title>Pay</Title>
      <Input onChange={handleNameChange} value={name} type="text" placeholder="To" required />
      <Input onChange={handleDateChange} value={date} type='text' onFocus={() => (dateRef.current.type = 'date', dateRef.current.focus())} placeholder='Select Date' ref={dateRef}/>
      <Input onChange={handlePayChange}  value={pay} type="number" placeholder="Amount Paid" required />
      <Input onChange={handleDueChange}  value={due} type="number" placeholder="Amount Due" required />
      <Input onChange={handleDescChange} value={desc} type="text" placeholder="Description" required />
      <Button type="submit">Pay</Button>
    </Container>
  );
}

export default FormPay;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width:80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  transition: background-color 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  @media (max-width: 768px) {
    padding: 10px;
    max-width: 90vw;
  }
`;



const Title = styled.h2`
  font-size: 32px;
  margin: 0 0 20px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
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


const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
  resize: vertical;

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

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #1E90FF;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0077B6;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 16px;
  }
`;
