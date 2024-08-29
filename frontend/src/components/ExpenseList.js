import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Prevents overflow issues */

  @media (max-width: 480px) {
    padding: 10px;
    width: calc(100% - 20px); /* Keeps content within the screen bounds */
  }
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const ListContainer = styled.div`
  background-color: #444;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto; /* Enables horizontal scrolling if necessary */

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  padding: 10px;
  border-bottom: 1px solid #555;
  color: #f9f9f9;
  font-weight: bold;
  background-color: #555;
  border-radius: 4px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr; /* Adjust to two columns for smaller screens */
    gap: 3px;
    padding: 5px;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  padding: 10px;
  border-bottom: 1px solid #555;
  color: #f9f9f9;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 3px;
    padding: 5px;
  }
`;

const ItemText = styled.div`
  text-align: center;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 12px;
    text-align: left;
  }
`;

const DeleteButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #f44336;
  color: white;
  font-size: 12px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #d32f2f;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const ExpenseList = ({ fetchExpenses: fetchExpensesProp }) => {
  const [expenses, setExpenses] = useState([]);

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpensesProp();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const fetchExpensesInternal = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses');
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
