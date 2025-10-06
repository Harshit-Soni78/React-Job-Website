import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  let body = '';
  if (req.method === 'POST' || req.method === 'PUT') {
    body = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(data));
      req.on('error', reject);
    });
    req.body = JSON.parse(body);
  }

  try {
    await client.connect();
    const db = client.db('jobwebsite'); // Replace with your database name
    const collection = db.collection('jobs');

    if (req.method === 'GET') {
      if (pathname === '/api/jobs') {
        const jobs = await collection.find({}).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).end(JSON.stringify(jobs));
      } else if (pathname.startsWith('/api/jobs/')) {
        const id = pathname.split('/')[3];
        const job = await collection.findOne({ id });
        if (job) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).end(JSON.stringify(job));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.status(404).end(JSON.stringify({ message: 'Job not found' }));
        }
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).end(JSON.stringify({ message: 'Not found' }));
      }
    } else if (req.method === 'POST') {
      if (pathname === '/api/jobs') {
        const newJob = req.body;
        newJob.id = Date.now().toString(); // Generate unique ID
        await collection.insertOne(newJob);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).end(JSON.stringify(newJob));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).end(JSON.stringify({ message: 'Not found' }));
      }
    } else if (req.method === 'PUT') {
      if (pathname.startsWith('/api/jobs/')) {
        const id = pathname.split('/')[3];
        const updatedJob = req.body;
        const result = await collection.updateOne({ id }, { $set: updatedJob });
        if (result.matchedCount > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).end(JSON.stringify(updatedJob));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.status(404).end(JSON.stringify({ message: 'Job not found' }));
        }
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).end(JSON.stringify({ message: 'Not found' }));
      }
    } else if (req.method === 'DELETE') {
      if (pathname.startsWith('/api/jobs/')) {
        const id = pathname.split('/')[3];
        const result = await collection.deleteOne({ id });
        if (result.deletedCount > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).end(JSON.stringify({ message: 'Job deleted' }));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.status(404).end(JSON.stringify({ message: 'Job not found' }));
        }
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).end(JSON.stringify({ message: 'Not found' }));
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.setHeader('Content-Type', 'application/json');
      res.status(405).end(JSON.stringify({ message: `Method ${req.method} Not Allowed` }));
    }
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
  } finally {
    await client.close();
  }
};
    