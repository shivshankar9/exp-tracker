import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #333;
  color: #f9f9f9;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  margin-right: 15px;
  padding: 12px;
  border: 1px solid #555;
  border-radius: 4px;
  font-size: 16px;
  background-color: #444;
  color: #f9f9f9;
  flex: 1;
  min-width: 150px;
`;

const Label = styled.label`
  margin-right: 15px;
  font-weight: bold;
  color: #f9f9f9;
  min-width: 100px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ExpenseForm = ({ fetchExpenses }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      amount,
      description,
      category,
    };

    try {
      await axios.post('http://expense-tracker-backend-ekx1pve4u-shivs-projects-db2d52eb.vercel.app/api/expenses', newExpense);
      setAmount('');
      setDescription('');
      setCategory('');
      fetchExpenses();  
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          required
        />
        <ButtonWrapper>
          <Button type="submit">Add Expense</Button>
        </ButtonWrapper>
      </Form>
    </FormContainer>
  );
};

export default ExpenseForm;
