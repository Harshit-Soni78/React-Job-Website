import Job from '../models/Job.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  const { _limit } = req.query;
  let query = Job.find({});

  if (_limit) {
    query = query.limit(parseInt(_limit));
  }

  const jobs = await query;
  res.json(jobs);
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    res.json(job);
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private
export const createJob = async (req, res) => {
  const { title, type, location, description, salary, company } = req.body;

  const job = new Job({
    title,
    type,
    location,
    description,
    salary,
    company,
  });

  const createdJob = await job.save();
  res.status(201).json(createdJob);
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = async (req, res) => {
  const { title, type, location, description, salary, company } = req.body;

  const job = await Job.findById(req.params.id);

  if (job) {
    job.title = title;
    job.type = type;
    job.location = location;
    job.description = description;
    job.salary = salary;
    job.company = company;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    await Job.deleteOne({ _id: job._id });
    res.json({ message: 'Job removed' });
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
};
