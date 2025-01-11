import express from 'express';

const router = express.Router();

router.post('/slot-available', async (req, res) => {
  const { entryTime, exitTime } = req.body;
  
});
