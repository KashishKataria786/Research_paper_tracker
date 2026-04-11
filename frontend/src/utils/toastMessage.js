import { toast } from 'react-toastify';
/**
 * Standard utility to show toast messages based on API success/failure
 * @param {string} message - The message to display
 * @param {boolean} success - Flag indicating success or failure
 */
export const toastMessage = (message, success) => {
    if (success) {
        toast.success(message);
    } else {
        toast.error(message || 'An error occurred');
    }
};
