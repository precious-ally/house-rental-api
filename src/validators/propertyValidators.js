
const validateProperty = (req, res, next) => {
  const {
    title,
    location,
    price,
    bedrooms,
    property_type,
    availability
  } = req.body;

  const errors = [];

  // Validate title
  if (typeof title !== "string" || !title.trim()) {
    errors.push("Title is required");
  }

  // Validate location
  if (typeof location !== "string" || !location.trim()) {
    errors.push("Location is required");
  }

  // Validate price
  if (
    price === undefined ||
    price === null ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    errors.push("Price must be a number greater than 0");
  }

  // Validate bedrooms
  if (!Number.isInteger(bedrooms) || bedrooms < 0) {
    errors.push("Bedrooms must be a non-negative integer");
  }

  // Validate property type
  const allowedTypes = ["apartment", "house", "duplex"];

  if (!allowedTypes.includes(property_type)) {
    errors.push(
      "Property type must be apartment, house, or duplex"
    );
  }

  // Validate availability
  const allowedAvailability = ["available", "rented"];

  if (!allowedAvailability.includes(availability)) {
    errors.push(
      "Availability must be available or rented"
    );
  }

  // Return errors if validation fails
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors
    });
  }

  // Continue to the next middleware/controller
  next();
};

// Validate optional location query
const validateLocationQuery = (req, res, next) => {
  const { location } = req.query;

  if (location !== undefined) {
    if (
      typeof location !== "string" ||
      !location.trim()
    ) {
      return res.status(400).json({
        message: "Location query must be a non-empty string"
      });
    }
  }

  next();
};

module.exports = {
  validateProperty,
  validateLocationQuery
};
