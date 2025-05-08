import React, { useState, useEffect } from "react";
import { createFood, getFoodItems } from "../api";

const AddEntityPage = () => {
  const [entities, setEntities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Fetch existing entities on component mount
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        // Get all food items with populated created_by field
        const response = await getFoodItems();
        if (response.data && response.data.data) {
          setEntities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };

    fetchEntities();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    // Validate origin
    if (!formData.origin.trim()) {
      newErrors.origin = "Origin is required";
    } else if (formData.origin.length < 2) {
      newErrors.origin = "Origin must be at least 2 characters";
    } else if (formData.origin.length > 100) {
      newErrors.origin = "Origin must be less than 100 characters";
    }

    // Validate description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Clear submit messages when form changes
    if (submitError) setSubmitError("");
    if (submitSuccess) setSubmitSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const response = await createFood(formData);

      if (response.data && response.data.data) {
        // Add the new entity to the list
        setEntities([...entities, response.data.data]);

        // Reset the form
        setFormData({ name: "", origin: "", description: "" });

        // Show success message
        setSubmitSuccess("Food item created successfully!");
      }
    } catch (error) {
      console.error("Error creating entity:", error);

      // Handle validation errors from the server
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = {};
        error.response.data.errors.forEach(err => {
          // Map server errors to form fields
          const field = err.param || err.path;
          if (field) {
            serverErrors[field] = err.msg || err.message;
          }
        });

        if (Object.keys(serverErrors).length > 0) {
          setErrors(serverErrors);
        } else {
          setSubmitError(error.response.data.message || "Failed to create food item. Please try again.");
        }
      } else {
        setSubmitError("Failed to create food item. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Add New Food Item</h1>

      {submitSuccess && (
        <div style={{
          padding: "10px",
          backgroundColor: "#d4edda",
          color: "#155724",
          borderRadius: "4px",
          marginBottom: "15px"
        }}>
          {submitSuccess}
        </div>
      )}

      {submitError && (
        <div style={{
          padding: "10px",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          borderRadius: "4px",
          marginBottom: "15px"
        }}>
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.name ? "1px solid #dc3545" : "1px solid #ced4da",
              borderRadius: "4px"
            }}
          />
          {errors.name && (
            <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>
              {errors.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="origin" style={{ display: "block", marginBottom: "5px" }}>Origin:</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.origin ? "1px solid #dc3545" : "1px solid #ced4da",
              borderRadius: "4px"
            }}
          />
          {errors.origin && (
            <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>
              {errors.origin}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="description" style={{ display: "block", marginBottom: "5px" }}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              border: errors.description ? "1px solid #dc3545" : "1px solid #ced4da",
              borderRadius: "4px"
            }}
          ></textarea>
          {errors.description && (
            <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>
              {errors.description}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px 20px",
            backgroundColor: isSubmitting ? "#6c757d" : "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Adding..." : "Add Food Item"}
        </button>
      </form>

      <h2>Food Items List</h2>
      {entities.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {entities.map((entity) => (
            <li key={entity._id || entity.id} style={{
              padding: "15px",
              marginBottom: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{entity.name}</h3>
              <div style={{ fontSize: "14px", color: "#6c757d", marginBottom: "5px" }}>
                Origin: {entity.origin}
              </div>
              <p style={{ margin: "5px 0 0 0" }}>{entity.description}</p>
              {entity.created_by && (
                <div style={{ fontSize: "12px", color: "#6c757d", marginTop: "10px" }}>
                  Created by: {entity.created_by.username || 'Unknown user'}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No food items added yet.</p>
      )}
    </div>
  );
};

export default AddEntityPage;