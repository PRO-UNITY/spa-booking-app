import axios from 'axios';
import { BASE_URL } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/fetchApi';

// login user with phone and password
export const loginUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  console.log(response.data);
  return response.data;
};

// register user with phone and password
export const registerUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/auth/send-code`, data);
  return response.data;
};

// forget password function api
export const forgetPassword = async (data: any) => {
  const response = await axios.post(
    `${BASE_URL}/auth/send-phone-to-password`,
    data
  );
  return response.data;
};

// verify user with phone and code
export const verifyUser = async (data: any) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('Token undefined');
      return null;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(`${BASE_URL}/auth/verify`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Error user:', error);
    throw error;
  }
};

//change profile password
export const setPasswordApi = async (data: any) => {
  const response = await api.put(`${BASE_URL}/profile`, data);
  return response.data;
};
