import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI environment variable not set');
  process.exit(1);
}

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

// Define the GET route for "/"
app.get('/', (req, res) => {
  res.send('<h1>Hello!! Welcome to Backend API for React-Job-Website</h1>');
});

// Define the GET route for "/jobs"
app.get('/jobs', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('jobwebsite');
    const collection = db.collection('jobs');

    const limit = req.query._limit ? parseInt(req.query._limit) : 0;
    const jobs = await collection.find({}).limit(limit).toArray();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// Define the GET route for "/jobs/:id"
app.get('/jobs/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('jobwebsite');
    const collection = db.collection('jobs');
    const job = await collection.findOne({ id: req.params.id });
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// Define the POST route for "/jobs"
app.post('/jobs', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('jobwebsite');
    const collection = db.collection('jobs');
    const newJob = req.body;
    newJob.id = Date.now().toString();
    await collection.insertOne(newJob);
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// Define the PUT route for "/jobs/:id"
app.put('/jobs/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('jobwebsite');
    const collection = db.collection('jobs');
    const updatedJob = req.body;
    const result = await collection.updateOne({ id: req.params.id }, { $set: updatedJob });
    if (result.matchedCount > 0) {
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// Define the DELETE route for "/jobs/:id"
app.delete('/jobs/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('jobwebsite');
    const collection = db.collection('jobs');
    const result = await collection.deleteOne({ id: req.params.id });
    if (result.deletedCount > 0) {
      res.json({ message: 'Job deleted' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
