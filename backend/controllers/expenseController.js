// controllers/expenseController.js
const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Public
exports.addExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Public
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Public
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
