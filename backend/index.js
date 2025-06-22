const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/mydb';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Mongo connection error:", err));

app.get('/', (req, res) => {
  res.json({ message: "Hello from Express + Mongoose backend!" });
});

app.listen(5000, () => {
  console.log('🚀 Backend running on port 5000');
});
