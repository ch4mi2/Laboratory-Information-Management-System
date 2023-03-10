const Services = require('../models/servicesModel');
const mongoose = require('mongoose');

// get all services
const getAllServices = async (req, res) => {
  const services = await Services.find({}).sort({ createdAt: -1 });

  res.status(200).json(services);
};

// get a service
const getAService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Service' });
  }

  const service = await Services.findById(id);

  if (!service) {
    return res.status(404).json({ error: 'No such Service' });
  }

  res.status(200).json(service);
};

// create a service
const createService = async (req, res) => {
  const { name, price, description } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!price) {
    emptyFields.push('price');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add doc to db
  try {
    const service = await Services.create({
      name,
      price,
      description,
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404), json({ error: 'No such service' });
  }

  const service = await Services.findByIdAndDelete({ _id: id });

  if (!service) {
    return res.status(404), json({ error: 'No such service' });
  }

  res.status(200).json(service);
};

// Update a service
const updateService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such service' });
  }

  const service = await Services.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!service) {
    return res.status(400).json({ error: 'No such service' });
  }

  return res.status(200).json(service);
};

module.exports = {
  getAllServices,
  getAService,
  updateService,
  deleteService,
  createService,
};
