import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333; /* Dark background */
  color: #f9f9f9; /* Light text color */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const ListContainer = styled.div`
  background-color: #444; /* Dark background for list */
  padding: 10px;
  border-radius: 4px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #555; /* Light border for separation */
  color: #f9f9f9; /* Light text color */
  font-weight: bold;
  background-color: #555; /* Slightly lighter background for headers */
  border-radius: 4px;
  margin-bottom: 10px; /* Space between header and first item */
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #555; /* Light border for separation */
  color: #f9f9f9; /* Light text color */
`;

const ItemText = styled.div`
  flex: 1;
  text-align: center;
  margin-right: 10px; /* Gap between columns */
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #f44336; /* Red background */
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f; /* Darker red on hover */
  }
`;

const ExpenseList = ({ fetchExpenses: fetchExpensesProp }) => {
  const [expenses, setExpenses] = useState([]);

  const deleteExpense = async (id) => {
    await axios.delete(`https://exp-back.vercel.app/api/expenses/${id}`);
    fetchExpensesProp();
  };

  const fetchExpensesInternal = async () => {
    try {
      const res = await axios.get('https://exp-back.vercel.app/api/expenses');
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpensesInternal();
    const interval = setInterval(fetchExpensesInternal, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Container>
      <Heading>Expense List</Heading>
      <ListContainer>
        <HeaderRow>
          <ItemText>Category</ItemText>
          <ItemText>Amount</ItemText>
          <ItemText>Description</ItemText>
          <ItemText>Action</ItemText>
        </HeaderRow>
        {expenses.map((expense) => (
          <Item key={expense._id}>
            <ItemText>{expense.category}</ItemText>
            <ItemText>{expense.amount}</ItemText>
            <ItemText>{expense.description}</ItemText>
            <DeleteButton onClick={() => deleteExpense(expense._id)}>Delete</DeleteButton>
          </Item>
        ))}
      </ListContainer>
    </Container>
  );
};

export default ExpenseList;
