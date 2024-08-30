import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to right, #141E30, #243B55);
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #ff0077;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  gap: 2rem;

`;

const ListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    order: 2; /* Displays below the chart on smaller screens */
  }
`;

const ChartWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;

`;

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://expense-tracker-backend-ekx1pve4u-shivs-projects-db2d52eb.vercel.app/api/expenses/');
      setExpenses(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received from server:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Container>
      <Header>Expense Tracker</Header>
      <FormWrapper>
        <ExpenseForm fetchExpenses={fetchExpenses} />
      </FormWrapper>
      <MainContent>
        <ListWrapper>
          <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />
        </ListWrapper>
        <ChartWrapper>
          <ExpenseChart expenses={expenses} />
        </ChartWrapper>
      </MainContent>
    </Container>
  );
}

export default App;
