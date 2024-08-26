import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 1000px; /* Increased width */
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #333; /* Dark background */
  color: #f9f9f9; /* Light text color */
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap; /* Allows elements to wrap to the next line if necessary */
  align-items: center; /* Vertically aligns items */
  justify-content: center; /* Center items horizontally */
`;

const Input = styled.input`
  margin-right: 15px; /* Space between inputs */
  padding: 12px;
  border: 1px solid #555; /* Dark border */
  border-radius: 4px;
  font-size: 16px;
  background-color: #444; /* Dark input background */
  color: #f9f9f9; /* Light text color */
  flex: 1; /* Allows inputs to take up remaining space */
  min-width: 150px; /* Ensures inputs have a minimum width */
`;

const Label = styled.label`
  margin-right: 15px; /* Space between label and input */
  font-weight: bold;
  color: #f9f9f9; /* Light text color */
  min-width: 100px; /* Ensures labels have a minimum width */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* Center the button within the wrapper */
  width: 100%;
  margin-top: 15px; /* Space above the button */
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50; /* Primary button color */
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049; /* Darker button color on hover */
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

    await axios.post('http://localhost:5000/api/expenses', newExpense);

    setAmount('');
    setDescription('');
    setCategory('');
    fetchExpenses();
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
