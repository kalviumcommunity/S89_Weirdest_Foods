import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFoodItems, deleteFood, isAuthenticated } from '../api';
import UserFilter from '../components/UserFilter';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchFoods = async (userId = null) => {
    try {
      setLoading(true);
      const response = await getFoodItems(userId);
      if (response.data && response.data.data) {
        setFoods(response.data.data);
      }
      setError('');
    } catch (error) {
      console.error('Error fetching food items:', error);
      setError('Failed to load food items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    fetchFoods(userId);
  };

  const handleDeleteFood = async (id) => {
    try {
      await deleteFood(id);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{
        marginBottom: '30px',
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: '700',
        color: '#2D3748'
      }}>Discover Weird Foods</h1>

      {isAuthenticated() ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          marginBottom: '30px'
        }}>
          <UserFilter onUserSelect={handleUserSelect} />
        </div>
      ) : (
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          marginBottom: '30px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #E2E8F0'
        }}>
          <p style={{
            marginBottom: '0',
            fontSize: '16px',
            color: '#4A5568'
          }}>
            Please <Link to="/login" style={{
              color: '#4A6FFF',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>login</Link> to filter foods by user.
          </p>
        </div>
      )}

      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid rgba(74, 111, 255, 0.2)',
            borderRadius: '50%',
            borderTopColor: '#4A6FFF',
            animation: 'spin 1s linear infinite',
            marginBottom: '15px'
          }}></div>
          <p style={{ color: '#4A5568', fontSize: '16px' }}>Loading food items...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : error ? (
        <div style={{
          color: '#E53E3E',
          textAlign: 'center',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #FED7D7'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: '#FFF5F5',
            color: '#E53E3E',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>!</div>
          {error}
        </div>
      ) : foods.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '70px',
            height: '70px',
            margin: '0 auto 20px',
            backgroundColor: '#EBF4FF',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '30px' }}>🍽️</span>
          </div>
          <p style={{
            fontSize: '18px',
            color: '#4A5568',
            marginBottom: '10px'
          }}>
            {selectedUserId ? 'No food items found for this user.' : 'No food items found.'}
          </p>
          {isAuthenticated() && (
            <Link to="/add-entity" style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#4A6FFF',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Add Your First Food
            </Link>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {foods.map((food) => (
            <div
              key={food._id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
                }
              }}
            >
              <div style={{
                height: '8px',
                background: 'linear-gradient(to right, #4A6FFF, #77AAFF)'
              }}></div>

              <div style={{ padding: '20px', flex: '1' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#2D3748'
                  }}>{food.name}</h3>

                  <div style={{
                    backgroundColor: '#EBF4FF',
                    color: '#4A6FFF',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {food.origin}
                  </div>
                </div>

                <p style={{
                  margin: '10px 0 15px 0',
                  color: '#4A5568',
                  lineHeight: '1.5',
                  flex: '1'
                }}>{food.description}</p>

                <div style={{
                  marginTop: 'auto',
                  borderTop: '1px solid #E2E8F0',
                  paddingTop: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {food.created_by && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#4A6FFF',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '8px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {food.created_by.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span style={{
                        fontSize: '14px',
                        color: '#718096'
                      }}>
                        {food.created_by.username || 'Unknown user'}
                      </span>
                    </div>
                  )}

                  {isAuthenticated() && (
                    <button
                      onClick={() => handleDeleteFood(food._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#FFF5F5',
                        color: '#E53E3E',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ marginRight: '4px' }}>🗑️</span>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodList;