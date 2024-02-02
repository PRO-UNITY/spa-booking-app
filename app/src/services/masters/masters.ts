import { BASE_URL } from '../../utils';
import api from '../../utils/fetchApi';

// get masters function
export const getMasters = async (page: number) => {
  const response = await api.get(`/masters/?page=${page}`);
  return response.data;
};

// get master by id function
export const getMasterById = async (id: number) => {
  const response = await api.get(`/profile/${id}`);
  return response.data;
};

// make appointment function
export const makeAppointment = async (data: any) => {
  console.log(data);

  const response = await api.post('/appointment/make_appointments/', data);
  return response.data;
};

// get appointments function
export const getAppointments = async (page: number) => {
  const response = await api.get(`/appointment/make_appointments/`);
  return response.data;
};
