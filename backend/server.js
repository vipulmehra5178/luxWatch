const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/watchesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Watch Schema
const watchSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
  discount: Number,
  images: [String],
  rating: Number,
  inventory: {
    quantity_in_stock: Number
  },
  technical_specs: {
    dial_size: String,
    strap_material: String,
    water_resistance: String,
    movement_type: String,
    battery_life: String,
    features: [String]
  },
  shipping: {
    delivery_time: String,
    charges: Number,
    options: [String]
  },
  reviews: [{
    user_name: String,
    rating: Number,
    user_comment: String
  }]
});

const Watch = mongoose.model('Watch', watchSchema);

// Routes
app.get('/watches', async (req, res) => {
  try {
    const watches = await Watch.find();
    res.json(watches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/watches/:id', async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id);
    if (watch) {
      res.json(watch);
    } else {
      res.status(404).json({ message: 'Watch not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sample data insertion route (for testing)
app.post('/watches/sample', async (req, res) => {
  const sampleWatch = new Watch({
    title: "Luxury Watch Model X",
    brand: "LuxBrand",
    price: 29999,
    discount: 10,
    images: ["https://example.com/watch1.jpg"],
    rating: 4.5,
    inventory: {
      quantity_in_stock: 5
    },
    technical_specs: {
      dial_size: "42mm",
      strap_material: "Leather",
      water_resistance: "30m",
      movement_type: "Automatic",
      battery_life: "N/A",
      features: ["Chronograph", "Date Display"]
    },
    shipping: {
      delivery_time: "3-5 days",
      charges: 0,
      options: ["Standard", "Express"]
    },
    reviews: [{
      user_name: "John Doe",
      rating: 5,
      user_comment: "Excellent watch!"
    }]
  });

  try {
    const newWatch = await sampleWatch.save();
    res.status(201).json(newWatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 