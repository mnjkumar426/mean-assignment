const {
    Worker, isMainThread, parentPort, workerData
  } = require('worker_threads');
  const fs = require('fs');

const csv = require('fast-csv');

const db=require('../db')
const policyModel=require('../models/policy');
const PolicyHelper=require('./policy.helper');
  if(!isMainThread)
  {
    parentPort.on('message', (filePath) => { 
    csv.parseFile(filePath,{headers:true})
     .on("data",async  (data)=> {
    //console.log(data);
       
    
    let count =await policyModel.count({policy_number:data.policy_number});


    try {
      if(count==0){
         data= await PolicyHelper.saveSubSchema(data);
         data=new policyModel(data);
         await data.save();
      }
      
      
    } catch (error) {
      console.log(error);
      
    }
    })
    .on("end", function () {
      fs.unlinkSync(filePath);
      parentPort.postMessage({success:true,message:"CSV uploaded successfully!"});   // remove temp file
    })



     });

    
  }