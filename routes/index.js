const express = require('express');
const router = express.Router();
const stream = require('stream');

//const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');
const { makeDocx } = require('../docx-templates/index.js');

router.post('/makedoc', (req, res) => {   
    makeDocx(req.body);
    res.status(200).json({message: "Successfully created document"});
});

//define a simple route
router.get('/', (req, res) => {
    res.json({"message": "Welcome to the API!"});
});



module.exports = router;
