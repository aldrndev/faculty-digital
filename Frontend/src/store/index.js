import axios from 'axios';
import { create } from 'zustand';

const BASE_URL = 'http://localhost:3000';

export const useLoginStore = create((set) => ({
  loading: false,
  error: null,
  message: null,

  login: async (email, password, navigateCallback) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const { data } = await axios({
        url: `${BASE_URL}/login`,
        method: 'POST',
        data: {
          email,
          password,
        },
      });

      set({
        message: data.message,
      });

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);
      navigateCallback('/');
    } catch (error) {
      console.log(error);
      set({
        error: error.response.data.message,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
  resetMessage: () => {
    set({ message: null });
  },
}));

export const useFetchProduct = create((set) => ({
  loading: false,
  error: null,
  data: [],

  fetchProduct: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const { data } = await axios({
        url: `${BASE_URL}/product`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      });

      console.log('API response:', data);

      set({
        data: data.data,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
