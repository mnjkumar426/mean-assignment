const User = require('../models/user');
const Agent = require('../models/agent');
const Carrier = require('../models/carrier');
const LOB = require('../models/lob');
const UserAccount = require('../models/user.account');
const Ipolicy = require('../helpers/Ipolicy.interface');
const Policy = require('../models/policy')
const Job = require('../models/job.model')

const Policyhelper = {
    saveSubSchema: async (data) => {

        let newOBj = Ipolicy;
        newOBj = {
            policy_number: data.policy_number,
            policy_start_date: data.policy_start_date,
            policy_end_date: data.policy_end_date,
            user: {
                address: data.address,
                firstname: data.firstname,
                dob: data.dob,
                email: data.email,
                gender: data.gender,
                phone: data.phone,
                zip: data.zip,
                state: data.state,
                userType: data.userType
            }, carrier: {
                company_name: data.company_name
            }, agent: {
                agent: data.agent
            },
            lob: { category_name: data.category_name }





        }
        //   console.log("before",newOBj);
        try {
            //newOBj.user=new User(newOBj.user); 
            newOBj.user = await User.findOneAndUpdate({ email: newOBj.user.email }, newOBj.user, { new: true, upsert: true });
            newOBj.carrier = await Carrier.findOneAndUpdate({ company_name: newOBj.carrier.company_name }, newOBj.carrier, { new: true, upsert: true });
            newOBj.agent = await Agent.findOneAndUpdate({ agent: newOBj.agent.agent }, newOBj.agent, { new: true, upsert: true });
            newOBj.lob = await LOB.findOneAndUpdate({ category_name: newOBj.lob.category_name }, newOBj.lob, { new: true, upsert: true });

        } catch (error) {
            console.log(error);

        }


        return newOBj;
    },


    search: async (username) => {
        let ids = await User.find({ "firstname": { $regex: username, $options: 'i' } }, { _id: 1 });
        ids = ids.map((id) => {
            return id._id

        })
        let results = await Policy.find({ user: { $in: ids } }).
            populate('user')
            .populate('lob')
            .populate('carrier')
            .populate('agent');
        return results;



    },
    job: (data) => {
        let date2 = data.date;
        let message = data.message;
        date2 = new Date(date2);
        date1 = new Date();
        var ms = Math.abs(date2 - date1)
        //  console.log("ms",ms,message);
        setTimeout(() => {
            let jobModel = new Job({ message: message });
            jobModel.save((err, result) => {
                console.log(err, result)

            })


        }, ms);

    }








}
module.exports = Policyhelper;