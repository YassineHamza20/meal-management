const Food = require('../models/foodModel')
const mongoose = require('mongoose')
const multer = require('multer');

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize Multer with storage configuration
const upload = multer({ storage });

// Ensure the 'uploads' directory exists
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const addFood = async (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.filename : null;

  let emptyFields = [];
  if (!name) {
    emptyFields.push('name');
  }
  if (!price) {
    emptyFields.push('price');
  }
  if (!image) {
    emptyFields.push('image');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const food = await Food.create({ name, price, image });
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


 
const updateFoodById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    let food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ error: 'No such Food' });
    }

    // If a new image is uploaded, process it
    if (req.file) {
      // Optionally check for file type here
      if (!req.file.mimetype.startsWith('image')) {
        return res.status(400).json({ error: 'Only image uploads are allowed' });
      }

      const oldImagePath = food.image ? path.join(__dirname, '../uploads/', food.image) : null;

      // Update the image field with the new image filename
      food.image = req.file.filename;

      // Save changes before attempting to delete the old image to ensure data integrity
      await food.save();

      // Delete the old image file from the server
      if (oldImagePath && fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
    }

    // Update other fields
    food = await Food.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(food);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFoodbyid = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).send();
    }
    res.send(food);
  } catch (error) {
    res.status(500).send(error);
  }
} 

const getFoodAll = async (req, res) => {
 
  const foods = await Food.find({  }).sort({createdAt:-1})
  res.status(200).json(foods)
} 

const deleteFood = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID format. No such Food exists." });
  }

  try {
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({ message: "No such Food found to delete." });
    }
    res.json({ message: "Food successfully deleted.", food });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food.", error });
  }
};

// const updateFoodById = async (req, res) => {
//   const { id } = req.params
//   try {
//     const food = await Food.findOneAndUpdate({_id: id}, req.body, { new: true });
//     if (!food) {
//       return res.status(404).json({error: 'No such Food'});
//     }
//     res.status(200).json(food);
//   } catch (error) {
//     console.error('Update error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

module.exports = {
  getFoodAll,addFood,getFoodbyid,deleteFood,updateFoodById,upload
}

 
  