import verify from '../verifyToken.js';
import User from '../models/User.js';
import SSMMSUser from '../models/SSMMSUser.js';
import express from 'express';
import { SSMMSuserValidation } from '../validation.js';

const router = express.Router();
router.post('/', verify, async (req, res)=>{
    const user = await User.findOne({email:req.body.email});
    res.json(user);
});

router.get('/', verify, async (req, res)=>{
    console.log("email", req.query.email);
    const user = await SSMMSUser.findOne({email:req.query.email});
    res.json(user);
});

router.post('/create', verify, async (req, res)=>{
    // lets validate the user data before creating user
    const {error} = SSMMSuserValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    // check if user already exists
    // const emailExist = await User.findOne({email:req.body.email});
    // if (emailExist) return res.status(400).send('email already exists');
    // hash the password
    // var salt = bcrypt.genSaltSync(10);
    // var hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // const salt = await bcrypt.gensalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt);
    const update = {
        villageName: req.body.villageName,
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        email: req.body.email
    }
    try{
        const query = { email: req.body.email };
        const options = { upsert: true };
        const user = await SSMMSUser.findOneAndUpdate(query, update, {
            new: true,
            upsert: true
          });
          res.json(user);
    }
    catch(err){
        console.log("error ",err);
        res.status(400).send(err);
    }
});

// module.exports = router;
export default router;