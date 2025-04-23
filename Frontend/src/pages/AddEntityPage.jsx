import React, { useState } from "react";

const AddEntityPage = () => {
  const [entities, setEntities] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate sending data to the server
    const newEntity = { ...formData, id: Date.now() };
    setEntities([...entities, newEntity]);

    // Reset the form
    setFormData({ name: "", description: "" });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Add New Entity</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description" style={{ display: "block", marginBottom: "5px" }}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            style={{ width: "100%", padding: "8px" }}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Entity
        </button>
      </form>

      <h2>Entities List</h2>
      {entities.length > 0 ? (
        <ul>
          {entities.map((entity) => (
            <li key={entity.id}>
              <strong>{entity.name}</strong>: {entity.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No entities added yet.</p>
      )}
    </div>
  );
};

export default AddEntityPage;