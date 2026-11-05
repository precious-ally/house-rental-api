
const express = require("express");
const router = express.Router();

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");

const {
  validateProperty,
  validateLocationQuery
} = require("../validators/propertyValidators");

// Validate the property ID in the URL
const validatePropertyId = (req, res, next) => {
  const { id } = req.params;

  if (!/^[1-9]\d*$/.test(id) ||
      !Number.isSafeInteger(Number(id))) {
    return res.status(400).json({
      message: "Property ID must be a positive integer"
    });
  }

  next();
};

// CREATE a property
router.post("/", validateProperty, createProperty);

// GET all properties or filter by location
router.get("/", validateLocationQuery, getAllProperties);

// GET a single property by ID
router.get("/:id", validatePropertyId, getPropertyById);

// UPDATE a property by ID
router.put("/:id", validatePropertyId, validateProperty, updateProperty);

// DELETE a property by ID
router.delete("/:id", validatePropertyId, deleteProperty);

module.exports = router;
