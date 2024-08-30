import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const ExpenseChart = ({ expenses }) => {
  const data = expenses.reduce((acc, expense) => {
    const categoryIndex = acc.findIndex((item) => item.name === expense.category);
    if (categoryIndex >= 0) {
      acc[categoryIndex].value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF00FF', '#800080'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
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
