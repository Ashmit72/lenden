import React from 'react'
import userSlice from '../../store/slices/userSlice';
import db from "../../../db.json";
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


export default function TransactionDetailsPage() {
const [party,setParty]=useState({})
const location=useLocation()
const id=location.search.split("=")[location.search.split("=").length=1]
  const userData=db.parties.map((party,id)=>{
    return party
  })
useEffect(()=>{
  console.log(userData.filter(el => el.id == id));
setParty(userData.filter((user)=> +user.id===+id)[0])
},[])
console.log(party);
  return (
    <div>This Page Displays Transaction Details for { party && party.name } !!</div>
  )
}
