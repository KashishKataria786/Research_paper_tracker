import API from './api';

/**
 * Service to handle analytics data fetching for the research dashboard.
 */
export const getAnalytics = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await API.get('/analytics', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
