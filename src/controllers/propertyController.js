
const db = require("../configs/db");

// 1. CREATE A NEW PROPERTY
const createProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      bedrooms,
      property_type,
      availability
    } = req.body;

    const sql = `
      INSERT INTO properties
      (title, location, price, bedrooms, property_type, availability)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      title.trim(),
      location.trim(),
      price,
      bedrooms,
      property_type,
      availability
    ]);

    return res.status(201).json({
      message: "Property created successfully",
      property: {
        id: result.insertId,
        title: title.trim(),
        location: location.trim(),
        price,
        bedrooms,
        property_type,
        availability
      }
    });
  } catch (error) {
    console.error("Create property error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// 2. GET ALL PROPERTIES OR FILTER BY LOCATION
const getAllProperties = async (req, res) => {
  try {
    const { location } = req.query;

    let sql = "SELECT * FROM properties";
    const values = [];

    if (location !== undefined) {
      sql += " WHERE location = ?";
      values.push(location.trim());
    }

    const [properties] = await db.execute(sql, values);

    return res.status(200).json({
      message: "Properties retrieved successfully",
      count: properties.length,
      properties
    });
  } catch (error) {
    console.error("Get properties error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// 3. GET ONE PROPERTY BY ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const [properties] = await db.execute(
      "SELECT * FROM properties WHERE id = ?",
      [id]
    );

    if (properties.length === 0) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    return res.status(200).json({
      message: "Property retrieved successfully",
      property: properties[0]
    });
  } catch (error) {
    console.error("Get property error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// 4. UPDATE AN EXISTING PROPERTY
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      location,
      price,
      bedrooms,
      property_type,
      availability
    } = req.body;

    const sql = `
      UPDATE properties
      SET title = ?,
          location = ?,
          price = ?,
          bedrooms = ?,
          property_type = ?,
          availability = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [
      title.trim(),
      location.trim(),
      price,
      bedrooms,
      property_type,
      availability,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    return res.status(200).json({
      message: "Property updated successfully"
    });
  } catch (error) {
    console.error("Update property error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// 5. DELETE A PROPERTY
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM properties WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    return res.status(200).json({
      message: "Property deleted successfully"
    });
  } catch (error) {
    console.error("Delete property error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// EXPORT ALL CONTROLLER FUNCTIONS
module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
