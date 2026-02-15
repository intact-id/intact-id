import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
});

export const submitApplication = async (formData) => {
    const response = await api.post('/api/public/companies/register', formData);
    return response.data;
};

export const getApplicationStatus = async (applicationNumber) => {
    const response = await api.get(`/api/public/applications/${applicationNumber}/status`);
    return response.data;
};

export default api;
