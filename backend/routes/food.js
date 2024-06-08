const express = require('express')
const {getFoodAll,addFood,getFoodbyid,deleteFood,updateFoodById, upload } = require('../controllers/foodController')
const router = express.Router()
 
const app = express();
app.use(express.json());
  
//router.post('/addFood', addFood)
router.post('/addFood', upload.single('image'), addFood);
router.put('/updateFoodById/:id',  upload.single('image'),updateFoodById)
router.get('/getFoodAll', getFoodAll)
router.get('/getFoodbyid/:id', getFoodbyid)
router.delete('/deleteFood/:id', deleteFood)

 

module.exports = router