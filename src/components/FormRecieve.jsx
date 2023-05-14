import React, { useRef,useState } from 'react';
import styled from 'styled-components';
import db from "../../db.json";
import { addUserRecieveDetails } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';


function FormRecieve() {
  
  const [name,setName]=useState('');
  const [date,setDate]=useState('');
  const [recieve,setRecieve]=useState('');
  const [due,setDue]=useState('');
  const [desc,setDesc]=useState('')
  const dateRef = useRef();
  const dispatch=useDispatch()

  const handleNameChange=(event)=>{
    setName(event.target.value);
  }
  const handleDateChange=(event)=>{
    setDate(event.target.value);
  }
  const handleRecieveChange=(event)=>{
    setRecieve(event.target.value);
  }
  const handleDueChange=(event)=>{
    setDue(event.target.value);
  }
  const handleDescChange=(event)=>{
    setDesc(event.target.value);
  }

  const handleSubmit= async (event)=>{
    event.preventDefault();
    const partiesName=db.parties.map((party)=>{
      return(
        party.name
      )
    })
    if (partiesName.indexOf(name)<0) {
      return alert(`Please enter the Valid Name. This User Doesnot exist!!!!`);
    }

const recievedTransactions=db.recieveDetails.find(item=>item.partyName===name);

    const recieveDetailsObject={
      partyName:name,
      recievedDate:date,
      // recievedAmount:recieve,
      // dueAmount:due,
      description:desc,
    };

    if (recievedTransactions) {
      const payload={
        ...recieveDetailsObject,
        ...recievedTransactions,
        recievedAmount:recievedTransactions.recievedAmount+recieve,
        dueAmount:recievedTransactions.dueAmount-recieve
      }
      await axios.put("http://192.168.254.156:5179/recieveDetails/"+recievedTransactions.id,payload)
    } else{
      await axios.post("http://192.168.254.156:5179/recieveDetails",{
       ...recieveDetailsObject,
       recievedAmount:recieve,
       dueAmount:due 
      })   

    }

    try{
    dispatch(addUserRecieveDetails({partyName:name,recievedDate:date,recievedAmount:recieve,dueAmount:due,description:desc}))
    setName('');
    setDate('');
    setRecieve('');
    setDue('');
    setDesc('');
    return alert(`Payment Recieved Successfully!!`)
    }
    catch(err){
      console.log(err.message);
    }
  }


  return (
    <Container onSubmit={handleSubmit} >
      <Title>Recieve</Title>
      <Input onChange={handleNameChange}  value={name} type="text" placeholder="From" required />
      <Input onChange={handleDateChange}  value={date} type='text' onFocus={() => (dateRef.current.type = 'date', dateRef.current.focus())} placeholder='Select Date' ref={dateRef}/>
      <Input onChange={handleRecieveChange}value={recieve} type="number" placeholder="Amount Recieved" required />
      <Input onChange={handleDueChange}   value={due} type="number" placeholder="Amount Due" required />
      <Input onChange={handleDescChange}  value={desc} type="text" placeholder="Description" required />
      <Button onClick={handleSubmit} type="submit">Recieve</Button>
    </Container>
  );
}

export default FormRecieve;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  transition: background-color 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  @media (max-width: 768px) {
    padding: 10px;
    max-width:90vw;
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
