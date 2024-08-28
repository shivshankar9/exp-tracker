import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Ensure axios is imported
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
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px; /* Maximum width for the content */
  gap: 2rem; /* Space between list and chart */
`;

const ListWrapper = styled.div`
  flex: 1; /* Allows the list to take up available space */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartWrapper = styled.div`
  flex: 1; /* Allows the chart to take up available space */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Ensure chart has enough space */
`;

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('https://exp-back.vercel.app/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
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
          <ExpenseList fetchExpenses={fetchExpenses} />
        </ListWrapper>
        <ChartWrapper>
          <ExpenseChart expenses={expenses} />
        </ChartWrapper>
      </MainContent>
    </Container>
  );
}

export default App;
