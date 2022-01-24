var express = require('express');
var router = express.Router();
const categoryRouter = require('./category')
const userRouter = require('./user')


/* GET home page. */
router.use('/category', categoryRouter)
router.use('/user', userRouter)



module.exports = router;
