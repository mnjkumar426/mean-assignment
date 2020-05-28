const express = require('express');
var router = express.Router();
var policyControllers=require('../controllers/policy.controller')
const multer = require('multer');;
  
    const upload = multer({ dest: 'tmp/csv/' });
    

router.post('/upload',upload.single('uploadCsv'),policyControllers.uploadCSV);
router.get('/search/:username',policyControllers.searchPolicy);
router.post('/job',policyControllers.job)
module.exports=router;
