import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FcCalendar, FcLeftDown, FcRightUp, FcExpired, FcLeftDown2, FcInspection } from "react-icons/fc";
import db from "../../../db.json";

export default function TransactionDetailsPage() {
  const [party, setParty] = useState({});
  const [transactions, setTransactions] = useState([]);
  const location = useLocation();
  const id = location.search.split("=")[1];

  useEffect(() => {
    const user = db.parties.find(party => party.id == id);
    if (!user) {
      return alert("Invalid user");
    }

    const paidTransactions = db.payDetails
      .filter(item => item.partyName === user.name)
      .flatMap(item => item.transactions.map(transaction => ({ ...transaction, type: "PAID" })));

    const receivedTransactions = db.recieveDetails
      .filter(item => item.partyname === user.name)
      .flatMap(item => item.transactions.map(transaction => ({ ...transaction, type: "RECEIVED" })));

    setParty(user);
    setTransactions([...paidTransactions, ...receivedTransactions]);
  }, [id]);

  return (
    <div>
      <h1>Transaction Details of {party && party.name}</h1>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th><FcCalendar />Date</th>
              <th><FcLeftDown />Amount Received</th>
              <th><FcRightUp />Amount Paid</th>
              <th><FcLeftDown2 />Amount Due To Receive</th>
              <th><FcExpired />Amount Due To Pay</th>
              <th><FcInspection />Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.type === 'PAID' ? transaction.payDate : transaction.recieveDate}</td>
                <td>{transaction.type === 'PAID' ? transaction.payAmount : '-'}</td>
                <td>{transaction.type === 'RECEIVED' ? transaction.recieveAmount : '-'}</td>
                <td>{transaction.type === 'PAID' ? transaction.toPayDue : '-'}</td>
                <td>{transaction.type === 'RECEIVED' ? transaction.toRecieveDue : '-'}</td>
                <td>{transaction.remarks}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );
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
