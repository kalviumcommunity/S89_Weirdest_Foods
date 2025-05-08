import React, { useState, useEffect } from "react";
import { getFoodItems, updateFood, deleteFood } from "../api";
import UserFilter from "./UserFilter";

const ManageEntitiesPage = () => {
  const [entities, setEntities] = useState([]);
  const [editFormData, setEditFormData] = useState({ id: "", name: "", origin: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch entities from the server
  const fetchEntities = async (userId = null) => {
    try {
      setLoading(true);
      const response = await getFoodItems(userId);
      if (response.data && response.data.data) {
        setEntities(response.data.data);
      }
      setError("");
    } catch (error) {
      console.error("Error fetching entities:", error);
      setError("Failed to load entities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    fetchEntities(userId);
  };

  // Handle input changes for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateFood(editFormData.id, {
        name: editFormData.name,
        origin: editFormData.origin,
        description: editFormData.description
      });

      // Refresh the entities list to get the updated data
      fetchEntities(selectedUserId);

      // Reset the form
      setEditFormData({ id: "", name: "", origin: "", description: "" });
    } catch (error) {
      console.error("Error updating entity:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteFood(id);
      // Refresh the entities list
      fetchEntities(selectedUserId);
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  // Populate the edit form with the selected entity's data
  const handleEditClick = (entity) => {
    setEditFormData({
      id: entity._id,
      name: entity.name,
      origin: entity.origin || "",
      description: entity.description
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Manage Food Items</h1>

      <UserFilter onUserSelect={handleUserSelect} />

      <h2>Food Items List</h2>
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Loading food items...</div>
      ) : error ? (
        <div style={{ color: "#dc3545", textAlign: "center", padding: "20px" }}>{error}</div>
      ) : entities.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {entities.map((entity) => (
            <li
              key={entity._id}
              style={{
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ marginBottom: "10px" }}>
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
              </div>
              <div>
                <button
                  onClick={() => handleEditClick(entity)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px"
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entity._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", padding: "20px" }}>
          {selectedUserId ? 'No food items found for this user.' : 'No food items available.'}
        </p>
      )}

      {editFormData.id && (
        <>
          <h2 style={{ marginTop: "30px" }}>Edit Food Item</h2>
          <form onSubmit={handleUpdate} style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "4px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="origin" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Origin:</label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={editFormData.origin}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="description" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Description:</label>
              <textarea
                id="description"
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
                rows="4"
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                required
              ></textarea>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Update Food Item
              </button>
              <button
                type="button"
                onClick={() => setEditFormData({ id: "", name: "", origin: "", description: "" })}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ManageEntitiesPage;