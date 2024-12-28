import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5034',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Transform response data
axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data;
    // Chuyển đổi format data
    return {
      Genres: data.genres?.$values || [],
      Mangas: data.mangas?.$values || []
    };
  },
  (error) => {
    console.error('API Error:', error);
    throw error?.response?.data || 'Có lỗi xảy ra';
  }
);

export const fetchData = async (endpoint) => {
  try {
    return await axiosInstance.get(endpoint);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};