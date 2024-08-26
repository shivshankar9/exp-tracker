import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const ExpenseChart = ({ expenses }) => {
  // Prepare data for the chart, categorize expenses
  const data = expenses.reduce((acc, expense) => {
    const categoryIndex = acc.findIndex((item) => item.name === expense.category);
    if (categoryIndex >= 0) {
      acc[categoryIndex].value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  // Define a color palette for categories
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={120} // Increased radius for visibility
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ExpenseChart;
