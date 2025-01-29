const { sybase } = require("../Middleware/db");
const HttpError = require('../models/errorModel');
const fs = require('fs');
const path = require('path');

// =======================CREATE Record=====================
//  POST api/cash 
//  Private



const createRecord = async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, 'denominations_data.txt');

    // Convert the request body to a formatted string
    const dataToWrite = JSON.stringify(req.body, null, 2);

    // Write to the file
    fs.writeFileSync(filePath, dataToWrite, 'utf8');

    console.log("Record added and saved to denominations_data.txt");

    res.status(201).json({ success: true, message: "Record added successfully" });
  } catch (error) {
    console.error("Error in createRecord:", error);
    next(new HttpError(error));
  }
};

// =======================GET Record=====================
//  GET api/cash 
//  Private
 
const getRecord = async (req, res, next) => {
  try {
    const query = 'SELECT * FROM stgke.TT_STOCK_CONTROL;';
    console.log("Executing query:", query);

    // Use querySync for proper async handling
    const result = await sybase.querySync(query);

    if (!result) {
      console.error("Query returned no result.");
      return res.status(404).json({ success: false, message: "No data found" });
    }

    console.log("Query Result:", result);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error executing query:', error);
    next(new HttpError(error));
  }
};


const getBranches = async(req,res,next)=>{
  try {
    const query = 'SELECT "NCBA_BRANCH_CODE", "NCBA_BRANCH_NAME" FROM STGKE.GDI_Bank_Branch_Codes ORDER BY "NCBA_BRANCH_CODE" ASC';
    console.log("Executing query:", query);

    // Use querySync for proper async handling
    const result = await sybase.querySync(query);

    if (!result) {
      console.error("Query returned no result.");
      return res.status(404).json({ success: false, message: "No data found" });
    }

    // console.log("Query Result:", result);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error executing query:', error);
    next(new HttpError(error));
  }
}

const addDenominations = async(req,res,next)=>{

}
 

const getBranchById = async (req, res, next) => {
  const branchId = req.params.id; // Extract branch ID from request parameters

  try {
    // const query = `SELECT "NCBA_BRANCH_CODE","NCBA_BRANCH_NAME","BANK_CODE","BANK_NAME" FROM  STGKE.GDI_Bank_Branch_Codes  WHERE  "NCBA_BRANCH_CODE" = '${branchId}'`;

    const query = `SELECT 
    DEPT_CODE, 
    DENOMINATION, 
    SUM(CAST(QUANTITY AS NUMERIC)) AS TOTAL_QUANTITY
FROM 
    stgke.TT_STOCK_CONTROL
WHERE 
    DEPT_CODE = '${branchId}'
    AND STOCK_DATE = '2025-01-27'
    AND DENOMINATION LIKE 'KES%' 
   
GROUP BY 
    DEPT_CODE, 
    DENOMINATION
ORDER BY 
    DEPT_CODE, 
    DENOMINATION;

`

    console.log("Executing query with branchId:", branchId);

    // Use querySync with the branch ID as a parameter
    // const result = await sybase.querySync(query, [branchId]);

    const result = await sybase.querySync(query);

    if (!result || result.length === 0) {
      console.error(`No data found for branch ID: ${branchId}`);
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }
    // res.status(200).json({msg:"done"})

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching branch by ID:", error);
    next(new HttpError(error));
  }
};


module.exports = {
  createRecord,
  getRecord,
  getBranches,
  addDenominations,
  getBranchById,
};
