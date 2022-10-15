import verify from '../verifyToken.js';
import User from '../models/User.js';
import express from 'express';

const router = express.Router();
router.post('/', verify, async (req, res)=>{
    const user = await User.findOne({email:req.body.email});
    res.json(user);
});

// module.exports = router;
export default router;