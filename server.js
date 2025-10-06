import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const port = 8000;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/jobs', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('jobwebsite');
    const collection = db.collection('jobs');
    const jobs = await collection.find({}).toArray();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
});

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
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
});

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
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
});

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
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
});

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
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
