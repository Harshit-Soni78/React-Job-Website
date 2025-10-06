
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

async function seedJobs() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI environment variable not set');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('jobwebsite');
    const collection = db.collection('jobs');

    // Clear existing jobs
    await collection.deleteMany({});

    // Read jobs.json
    const jobsPath = path.join(process.cwd(), 'scripts', 'jobs.json');
    const jobsData = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));

    // Insert jobs
    const jobs = jobsData.jobs.map(job => ({
      ...job,
      id: job.id.toString()
    }));

    const result = await collection.insertMany(jobs);
    console.log(`Inserted ${result.insertedCount} jobs`);
  } catch (err) {
    console.error('Error seeding jobs:', err);
  } finally {
    await client.close();
  }
}

seedJobs();
