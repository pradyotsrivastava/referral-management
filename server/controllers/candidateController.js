const Candidate = require('../models/candidateModel');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');

// Validation schema for candidate
const candidateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  jobTitle: Joi.string().required(),
  status: Joi.string().valid('Pending', 'Reviewed', 'Hired').default('Pending'),
  resume: Joi.string().optional(),
});

// Storage setup for resume upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Only .pdf files are allowed'));
  }
  cb(null, true);
}});

// Add candidate
exports.addCandidate = [upload.single('resume'), async (req, res) => {
  try {
    const { error, value } = candidateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const candidateData = { ...value, userId: req.userId };
    if (req.file) {
      candidateData.resume = req.file.path;
    }

    const candidate = new Candidate(candidateData);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}];

// Get all candidates with optional filters for status and name
exports.getCandidates = async (req, res) => {
  try {
    const { status, name } = req.query; 
    const filter = { userId: req.userId };

    if (status) {
      filter.status = status;
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    const candidates = await Candidate.find(filter);
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update candidate status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    res.status(200).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
