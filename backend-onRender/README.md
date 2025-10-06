# Job Website Backend

This is the backend API for the Job Website, built with Express.js and MongoDB.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Fill in your MongoDB Atlas connection string in `.env`:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   PORT=8000
   ```

4. Seed the database (optional):

   ```bash
   node seedJobs.js
   ```

5. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get a specific job
- `POST /jobs` - Create a new job
- `PUT /jobs/:id` - Update a job
- `DELETE /jobs/:id` - Delete a job

## Deployment to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `PORT` - 10000 (or whatever Render assigns)

## Environment Variables

- `MONGODB_URI` - MongoDB Atlas connection string (required)
- `PORT` - Server port (optional, defaults to 8000)
