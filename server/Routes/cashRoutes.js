const { Router } = require('express');
const router = Router();

const {
  createRecord,
  getRecord,
  getBranches,
  getBranchById, // Import the new controller
} = require('../controllers/cashController');

// Routes
router.post('/', createRecord);
router.get('/', getRecord);
router.get('/branches', getBranches);
router.get('/branch/:id', getBranchById); // New route for fetching a single branch by ID

module.exports = router;
