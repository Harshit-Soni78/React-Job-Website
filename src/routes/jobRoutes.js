import express from 'express';
const router = express.Router();
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJobById).put(updateJob).delete(deleteJob);

export default router;
