const { Router } = require('express');

const router = Router();




const {
  createRecord,
  getRecord
  } = require('../controllers/cashController');


router.post('/',createRecord);
router.get('/',getRecord);

module.exports = router;