import React from 'react'
import userSlice from '../../store/slices/userSlice';
import db from "../../../db.json";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { FcCalendar } from "react-icons/fc";
import { FcLeftDown } from "react-icons/fc";
import { FcRightUp } from "react-icons/fc";
import { FcExpired } from "react-icons/fc";
import { FcLeftDown2 } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";


export default function TransactionDetailsPage() {

  // const [date,setDate]=useState('');
  // const [amountToPay,setAmountToPay]=useState('');
  // const [amountToRecieve,setAmountToRecieve]=useState('');
  // const [amountDueToPay,setAmountDueToPay]=useState('');
  // const [amountDueToRecieve,setAmountDueToRecieve]=useState('');
  // const [desc,setDesc]=useState('');




  const [party, setParty] = useState({})
  const [transactions, setTransactions] = useState([])
  const location = useLocation()
  const id = location.search.split("=")[location.search.split("=").length = 1]
  const userData = db.parties.map((party, id) => {
    return party
  })

  useEffect(() => {
    const user = userData.find(el => el.id == id)
    if (!user) {
      return alert("Invalid user")
    }

    const paidTransactions = db.payDetails.filter(item => item.partyName === user.name).map(item => ({...item, type: "PAID"}))
    const receivedTransactions = db.recieveDetails.filter(item => item.partyName === user.name).map(item => ({...item, type : "RECEIVED"}))

    setParty(user)
    setTransactions([...paidTransactions, ...receivedTransactions])

  }, [id])
  console.log(transactions);
  return (
    <div>
      <h1>Transaction Details of {party && party.name}</h1>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th><FcCalendar />Date</th>
              <th><FcRightUp />Amount Paid</th>
              <th><FcLeftDown />Amount  Recieved</th>
              <th><FcExpired />Amount Due To Pay</th>
              <th><FcLeftDown2 />Amount Due To Recieve</th>
              <th><FcInspection />Description</th>
            </tr>
          </thead>
          <tbody>
            {
              transactions.map(transaction => (
              <tr>
                <td>{transaction.type === 'PAID' ? transaction.paidDate : transaction.recievedDate}</td>
                <td>{transaction.type === 'PAID' ? transaction.paidAmount : '-'}</td>
                <td>{transaction.type === 'RECEIVED' ? transaction.receivedAmount : '-'}</td>
                <td>{transaction.type === 'PAID' ? transaction.dueAmount : '-'}</td>
                <td>{transaction.type === 'RECEIVED' ? transaction.dueAmount : '-'}</td>
                <td>{transaction.description}</td>
              </tr>
              ))
            }
          </tbody>
        </Table>
      </TableWrapper>

    </div>

  )
}
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  th,
  td {
    padding: 0.5rem;
    text-align: center;
    border: 1px solid #ddd;
    font-size: 1rem;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 0.2rem;
      font-size: 0.8rem;
    }
  }
`;
