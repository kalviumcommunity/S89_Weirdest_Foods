import React, { useState, useEffect } from "react";
import { getFoodItems, updateFood, deleteFood } from "../api";

const ManageEntitiesPage = () => {
  const [entities, setEntities] = useState([]);
  const [editFormData, setEditFormData] = useState({ id: "", name: "", description: "" });

  // Fetch entities from the server
  useEffect(() => {
    const fetchEntities = async () => {
      const response = await getFoodItems();
      setEntities(response.data);
    };
    fetchEntities();
  }, []);

  // Handle input changes for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateFood(editFormData.id, { name: editFormData.name, description: editFormData.description });
    const updatedEntities = entities.map((entity) =>
      entity.id === editFormData.id ? { ...entity, name: editFormData.name, description: editFormData.description } : entity
    );
    setEntities(updatedEntities);
    setEditFormData({ id: "", name: "", description: "" });
  };

  // Handle delete
  const handleDelete = async (id) => {
    await deleteFood(id);
    const updatedEntities = entities.filter((entity) => entity.id !== id);
    setEntities(updatedEntities);
  };

  // Populate the edit form with the selected entity's data
  const handleEditClick = (entity) => {
    setEditFormData({ id: entity.id, name: entity.name, description: entity.description });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Manage Entities</h1>

      <h2>Entities List</h2>
      {entities.length > 0 ? (
        <ul>
          {entities.map((entity) => (
            <li key={entity.id}>
              <strong>{entity.name}</strong>: {entity.description}
              <button onClick={() => handleEditClick(entity)} style={{ marginLeft: "10px" }}>Edit</button>
              <button onClick={() => handleDelete(entity.id)} style={{ marginLeft: "10px", color: "red" }}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No entities available.</p>
      )}

      <h2>Edit Entity</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editFormData.name}
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
            value={editFormData.description}
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
          Update Entity
        </button>
      </form>
    </div>
  );
};

export default ManageEntitiesPage;