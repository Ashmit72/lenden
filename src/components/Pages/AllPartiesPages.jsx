import MyCard from '../MyCard'
import styled from 'styled-components'
import { FiChevronsDown } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addUser, removeUser, setUser } from '../../store/slices/userSlice';
import axios from 'axios';
import { useEffect } from 'react';
import db from "../../../db.json";






export default function AllPartiesPages() {

  // css
  const mediaMatch = window.matchMedia('(max-width: 768)');

  const partiesContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "none",
    flexDirection: mediaMatch ? "column" : "row"
  }

   

  const partiesListStyle = {
    boxShadow: "2px 2px 4px #eaeaea",
    width: "85%"
  }


  const partiesFormStyle = {
    boxShadow: "2px 2px 4px #eaeaea"
  }
  // css


  const removeAllDetails=async(id)=>{
    try{
      await axios.delete(`http://192.168.1.22:5179/payDetails/${id}`)     
      await axios.delete(`http://192.168.1.22:5179/recieveDetails/${id}`)
      } catch(err){
        console.log(err.message);
      }
  }

  if (db.parties.length === 0) {
    db.parties = [];
    db.payDetails = [];
    db.recieveDetails = [];
    removeAllDetails();
    localStorage.setItem('db', JSON.stringify(db));
  }
  

  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible)
  }
  const toggleOnClick = () => {
    setVisible(handleToggle())
  }
  const [inputName, setInputName] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [inputAdress, setInputAdress] = useState('')

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const userId= Math.random()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const partiesName=db.parties.map((party)=>{
      return(
        party.name.trim()
      )
    })
    console.log(partiesName);
    if (partiesName.indexOf(inputName.trim()) >-1) {
      return alert(`This user has already been added!!!!`)
    }

    const partyObject = {
      name: inputName,
      phone: inputPhone,
      adress: inputAdress,
      id:userId
    };
    try {

      await axios.post("http://192.168.1.22:5179/parties", partyObject)
      dispatch(addUser({ name: inputName, phone: inputPhone, adress: inputAdress,id:userId}))
      setInputName('');
      setInputPhone('');
      setInputAdress('');
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleInputName = (event) => {
    setInputName(event.target.value)
  }
  const handleInputPhone = (event) => {
    setInputPhone(event.target.value)
  }
  const handleInputAdress = (event) => {
    setInputAdress(event.target.value)
  }

  const deleteUser = async (id) => {
    const proceed=window.confirm('Are you sure you want to delete the party?');
    if (proceed) {
      console.log(id);
      dispatch(removeUser(id))
      await axios.delete(`http://192.168.1.22:5179/parties/${id}`)  
      await removeAllDetails();
    }
    else{
    }
      console.log("Operation Terminated");
    }
    


  const getUser = async () => {
    try {
      const res = await axios.get("http://192.168.1.22:5179/parties");
      dispatch(setUser(res.data));

    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getUser();
  }, [])
  return (
    <div>
      <MyCard />
      <Container2 style={partiesContainerStyle}>
        <Contentbox1 style={partiesListStyle}>
          <h1>Parties List!!</h1>
          <ul>
              {user.map((users, index) => (
            <Link to={`/party?id=${users.id}`} >
                <List key={index} >
                  {users.name}
                  <span onClick={(event) => {
                    event.preventDefault();
                    deleteUser(users.id);
                
                  }
                  } ><AiTwotoneDelete className="delete-btn" /></span>
                </List>

            </Link>
              ))}
          </ul>
        </Contentbox1>


        <Contentbox2 style={partiesFormStyle}>
          <h3 onClick={handleToggle} ><FiChevronsDown/>Add New Party</h3>
          <Content visible={visible} >
            <form onSubmit={handleSubmit}>
              <Input value={inputName} onChange={handleInputName} placeholder='Name' type="text" />
              <Input value={inputPhone} onChange={handleInputPhone} placeholder='Phone Number' type="number" />
              <Input value={inputAdress} onChange={handleInputAdress} placeholder='Adress' type="text" />
              <Button onClick={toggleOnClick} >Add Party</Button>
            </form>
          </Content>
        </Contentbox2>
      </Container2>
    </div>
  )
}






const Container2 = styled.div`
display: flex;
  flexDirection: mediaMatch ? "column" : "row"
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
const Contentbox2 = styled.div`
width:85%;
@media (max-width:768px){
  width:100%;
  
}
`;
const Contentbox1 = styled.div`
width:85%;
`;
const Content = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: ${({ visible }) => visible ? 'block' : 'none'};
  }
`;

const List = styled.li`
// border-bottom:0.25px solid gray;
list-style-type:none;
border-bottom:0.5px solid gray;
width:max-content;
padding-left:1rem;
padding-top:1rem;
`;

