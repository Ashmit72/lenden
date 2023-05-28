import React, { useRef,useState,useEffect } from 'react';
import styled from 'styled-components';
import db from "../../db.json";
import { addUserRecieveDetails } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';


function FormRecieve() {
  
  const [name,setName]=useState('');
  const [suggestedNames, setSuggestedNames] = useState([]);
  const [date,setDate]=useState('');
  const [recieve,setRecieve]=useState('');
  const [due,setDue]=useState('');
  const [desc,setDesc]=useState('');
  const dateRef = useRef();
  const suggestionsRef=useRef();
  const dispatch=useDispatch();

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestedNames([]);
      }
    };
  
    const handleGlobalClick = () => {
      setSuggestedNames([]);
    };
  
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('click', handleGlobalClick);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);
 



  const handleNameChange=(event)=>{
    const query=event.target.value;
    setName(query);
    const suggestions=db.parties.filter(party=>party.name.toLowerCase().includes(query.toLowerCase()));
    setSuggestedNames(suggestions);
  }

  const handleSuggestionClick=(name)=>{
    setName(name);
    setSuggestedNames([]);
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
    const currentParty = db.parties.find(party =>party.name === name);
    
    if (!currentParty) {
      return alert(`Please enter the Valid Name. This User Doesnot exist!!!!`);
    }

    const recievedTransactions=db.recieveDetails.find(item=> item.partyid === currentParty.id);
    
    const payload={
        recieveDate: date,
        recieveAmount: recieve,
        toRecieveDue: due,
        remarks: desc
    }
    if (recievedTransactions) {
      recievedTransactions.transactions.push(payload);
      await axios.put(`http://192.168.1.22:5179/recieveDetails/${recievedTransactions.id}`, recievedTransactions)
    } else{
      const data = {
        partyid: currentParty.id,
        partyname: currentParty.name,
        transactions: [payload]
      }
      await axios.post("http://192.168.1.22:5179/recieveDetails",data)   
    }

    try{
    dispatch(addUserRecieveDetails(db.recieveDetails.find(item => {return item.partyid === currentParty.id})))
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
      {suggestedNames.length > 0 && (
        <Suggestions ref={suggestionsRef}>
          {suggestedNames.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.name)}
            >
              {suggestion.name}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
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

// const Textarea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 18px;
//   resize: vertical;

//   &:focus {
//     outline: none;
//     border-color: #1E90FF;
//     box-shadow: 0px 0px 4px rgba(30, 144, 255, 0.5);
//   }

//   @media (max-width: 768px) {
//     font-size: 16px;
//     padding: 8px;
//     margin-bottom: 10px;
//   }
// `;

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
const Suggestions = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 82%;
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
  top: 28rem; 
  left: 50%; 
  transform: translateX(-50%); 

  @media (max-width: 768px) {
    width: 94.5%;
    left: 50%;
    top:24.4rem;
  }
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }
`;

