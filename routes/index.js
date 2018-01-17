const express = require('express');
const router = express.Router();
const stream = require('stream');
const s3 = require('../docx-templates/uploadToS3');

//const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');
const docxTemplater = require('../docx-templates/docxTemplater');


// This is the primary route for creating documents with posted data
router.post('/makedoc', catchErrors(async (req, res, next) => {       
        const postResults = await docxTemplater.saveDoc(req.body);
        res.status(200).json(postResults)   
}));

router.get('/download/:filename', (req, res, next) => {
    s3.downloadFile(req.params.filename)
        .then(data => {            
            res.send(data.Body);
        })
        .catch(err => {            
            res.json(err);
        });
});

//define a simple route
router.get('/', (req, res) => {
    res.json({"message": "Welcome to the API!"});
});

module.exports = router;
