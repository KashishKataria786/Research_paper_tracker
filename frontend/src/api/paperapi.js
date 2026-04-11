import API from './api';

/**
 * Fetch all research papers for the authenticated user
 */
export const getAllPapers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get('/papers/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Add a new research paper (supports PDF upload)
 * @param {FormData} formData - Multipart form data including paper details and optional PDF
 */
export const addPaper = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post('/papers/add', formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Delete a research paper by ID
 * @param {string} id - The unique ID of the paper
 */
export const deletePaper = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.delete(`/papers/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Update an existing research paper
 * @param {string} id - The ID of the paper to update
 * @param {object} data - The updated paper metrics
 */
export const updatePaper = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.put(`/papers/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};