const PolicyHelper=require('../helpers/policy.helper');
const {
  Worker, isMainThread
} = require('worker_threads');

let worker;
if(isMainThread){
  worker=new Worker('./helpers/worker.js');
}

exports.uploadCSV=async (req,res,next)=>{
  //Upload CSV in Worker thread
  worker.postMessage(req.file.path);
 worker.on('message', (data) => { 
    res.send(data)
  });
 
};
exports.searchPolicy=async(req,res,next)=>{

  let search=req.params.username;
  let results=await PolicyHelper.search(search);
  res.json(results)

}
exports.job=(req,res,next)=>{
  let data=req.body
  PolicyHelper.job(data)
  res.json({success:true,message:"Job schedule sucessfully!"})

}