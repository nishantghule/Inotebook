const express = require("express");
const User = require('../models/User');
const fetchuser = require('../middelware/fetchuser')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'nishantghule$patil ';

//create a user using: POST "/api/auth/createuser".  signupDoesn't require Auth no login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail().matches(/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] , async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user= await User.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({error: "sorry,user with this email - "+req.body.email+" already exist"})
    }
    const salt= await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      res.json({authToken});
    }
      catch(error){
        res.status(500).send("Some Error occured");
      }
    }
  )
  //authenticate a user  using: POST "/api/auth/login".  signupDoesn't require Authentication login required
  router.post('/login',[
    body('email', 'Enter a valid email').isEmail().matches(/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
    body('password','password cannot be empty').exists()
] , async (req, res) => { 
  //if there are errors return Bad Request and the error
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please login with correct credentials"})
    }
    const passwordCompare =await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({error: "Please login with correct credentials"})
    }
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken});
  }catch(error){
    res.status(500).send("Internal Server Error");
  }
})

 //to get looged in userusing: GET "/api/auth/getUser".login required
 router.get('/getUser',fetchuser, async (req, res) => { 
 try{
  userID= req.user.id;
  const user = await User.findById(userID).select("-password");
  res.send(user);
 }catch(error){
  res.status(500).send("Internal Server Error");
 }
}
)
module.exports = router;
