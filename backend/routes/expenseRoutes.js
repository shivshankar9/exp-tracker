// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

// @desc    Get all expenses
// @route   GET /api/expenses
router.get('/', getExpenses);

// @desc    Add new expense
// @route   POST /api/expenses
router.post('/', addExpense);

// @desc    Update an expense
// @route   PUT /api/expenses/:id
router.put('/:id', updateExpense);

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
router.delete('/:id', deleteExpense);

module.exports = router;
