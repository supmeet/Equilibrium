import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/equilibrium';

// DB connection
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(MONGO_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => {
        console.error("Failed to connect to DB");
        console.error(err);
      });
  };
  

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Equilibrium API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const startServer = async () => {
    try {
      connectDB();
      app.listen(8080, () => console.log("Server started on port 8080"));
    } catch (error) {
      console.log(error);
    }
  };
  
startServer();
  
