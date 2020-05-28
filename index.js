const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const { mongoose } = require('./db.js');



const policyRoutes = require('./routes/policy.route');
const cpuusages = require('./helpers/memory.helper');
const app = express();
app.use(bodyParser.json());
let restart = false;


//Server
let server = app.listen(3000, () => console.log('Server started at port : 3000'));

//Routes
app.use('/', router);
app.use('/policy', policyRoutes);

  //Checking CPU uses in One Min

setInterval(() => {
  
    cpuusages.getCPU(function (cpuUses) {

        if (cpuUses > 70) {
            server.close(() => {
                console.log("server closed.");
                restart = true;
                process.exit(1);
            });;

        }


    });
}, 60 * 1000);


process.on("exit", function () {
    //Restarting server
    if (restart) {
        let subProcess = require("child_process").spawn(process.argv[0], process.argv.slice(1), {
            cwd: process.cwd(),
            detached: true,
            stdio: "inherit"
        });
        restart = false;
        subProcess.unref();
    }



});




