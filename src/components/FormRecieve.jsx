import React, { useRef } from 'react';
import styled from 'styled-components';



function FormRecieve() {
  const dateRef = useRef();

  return (
    <Container>
      <Title>Recieve</Title>
      <Input type="text" placeholder="From" required />
      <Input type='text' onFocus={() => (dateRef.current.type = 'date', dateRef.current.focus())} placeholder='Select Date' ref={dateRef}/>
      <Input type="number" placeholder="Amount Recieved" required />
      <Input type="number" placeholder="Amount Due" required />
      <Input type="text" placeholder="Description" required />
      <Button type="submit">Recieve</Button>
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
