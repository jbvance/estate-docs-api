const express = require('express');
const router = express.Router();
const stream = require('stream');

//const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');
const { makeDocx } = require('../docx-templates/index.js');
const docxTemplater = require('../docx-templates/docxTemplater');


// This is the primary route for creating documents with posted data
router.post('/makedoc', catchErrors(async (req, res, next) => {       
        const test = await docxTemplater.SaveDoc(req.body);
        res.status(200).json({message: "Successfully created the awesome document"})   
}));

//define a simple route
router.get('/', (req, res) => {
    res.json({"message": "Welcome to the API!"});
});

module.exports = router;
