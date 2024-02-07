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

// reschedule appointment function with api
export const rescheduleAppointment = async (id: number, data: any) => {
  const response = await api.put(`/appointment/get_appointments/${id}`, data);
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

// add doctor to saved doctors
export const addMasterToSaved = async (data: any) => {
  const response = await api.post(`/saved`, data);
  return response.data;
};

// accept appointment function
export const statusAppointment = async (
  id: number | object,
  statusId: number
) => {
  const response = await api.patch(
    `/appointment/get_appointments/${id}/?status_id=${statusId}`
  );
  return response.data;
};

// // get filtered doctors by query
export const getFilteredMasters = async (query: string) => {
  const queryParts = query.split(' ');
  const queryParams: any = {};
  if (queryParts.length > 0) {
    queryParams.first_name = queryParts.join(' ');
  }
  const response = await api.get('/masters/', { params: queryParams });
  return response.data;
};

// get saved doctors
export const getSavedMasters = async () => {
  const response = await api.get(`/saved`);
  return response.data;
};

// delete saved doctor
export const deleteSavedMaster = async (id: number) => {
  const response = await api.delete(`/saved/${id}`);
  return response.data;
};
