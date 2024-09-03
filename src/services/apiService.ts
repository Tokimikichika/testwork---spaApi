import axios from 'axios';

const API_URL = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs';

export const apiService = {
  getData: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Using token:', token);  // Логирование токена
      const response = await axios.get(`${API_URL}/userdocs/get`, {
        headers: {
          'x-auth': token,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);  // Логирование ответа
      if (response.data && Array.isArray(response.data.data)) {  // Проверяем, что response.data.data - это массив
        return response.data.data; // Возвращаем данные
      } else {
        console.error('API returned an unexpected response format:', response.data);
        return []; // Возвращаем пустой массив, если данные отсутствуют
      }
    } catch (error) {
      console.error('Failed to fetch data from API:', error);
      throw new Error('Failed to fetch data from API');
    }
  },

  createData: async (newData: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(`${API_URL}/userdocs/create`, newData, {
        headers: {
          'x-auth': token,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create data:', error);
      throw new Error('Failed to create data');
    }
  },

  updateData: async (id: string, updatedData: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(`${API_URL}/userdocs/set/${id}`, updatedData, {
        headers: {
          'x-auth': token,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to update data for ID ${id}:`, error);
      throw new Error('Failed to update data');
    }
  },

  deleteData: async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(`${API_URL}/userdocs/delete/${id}`, {}, {
        headers: {
          'x-auth': token,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to delete data for ID ${id}:`, error);
      throw new Error('Failed to delete data');
    }
  },
};
