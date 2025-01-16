// const Post = require('../models/postModel');

const HttpError = require('../models/errorModel');

// =======================CREATE Record=====================
//  POST api/cash 
//  Private

const createRecord = async (req, res, next) => {
  try {
    console.log("record added")
  } catch (error) {
    next(new HttpError(error));
  }
};

// =======================GET Record=====================
//  POST api/cash 
//  Private

const getRecord = async (req, res, next) => {
  try {
    res.status(200).json({"message":"record added"});
  } catch (error) {
    next(new HttpError(error));
  }
};


module.exports = {
  createRecord,
  getRecord
 
};