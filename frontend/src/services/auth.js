import axios from "axios";
import api from "./api";

const API_URL = "http://localhost:4000"; 

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data; 
};
export const register = async (name, lastname, email, phone_number, password, password_repeat) => {
  const res = await axios.post(`${API_URL}/auth/register`, { name, lastname, email, phone_number, password, password_repeat });
  return res.data; 
};
export const verifyEmail = async (token) => {
  const res = await axios.get(`${API_URL}/auth/verify-email/${token}`);
  return res.data;
};
export const registerProvider = async ( profession, description, categories, state, services_offered) => {
  const res = await api.post(`/providers/register`, {profession, description, categories, state, services_offered} );
  return res.data; 
};
export const categoriesAdmin = async () => {
  const res = await api.get(`/categories/admin/categories`) ;
  return res.data; 
};
export const categoriesPublic = async () => {
  const res = await api.get(`/categories/categories`) ;
  return res.data; 
};
export const createCategory = async (name, description) => {
  const res = await api.post(`/categories/`, {name, description}) ;
  return res.data; 
};
export const editCategory = async (id, data) => {
  const res = await api.patch(`/categories/${id}`, data) ;
  return res.data; 
};
export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`) ;
  return res.data; 
};
export const usersAdmin = async (options = {}) => {
  const res = await api.get(`/users/admin/users`, {
  params: options}) 
  return res.data; 
};
export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`) ;
  return res.data; 
};
export const unDeleteUser = async (id) => {
  const res = await api.patch(`/users/restore/${id}`) ;
  return res.data; 
};
export const getProviders = async (options = {}) => {
  const res = await api.get(`/providers/`, {
  params: options}) ;
  return res.data; 
};
export const getProvidersAdmin = async (options = {}) => {
  const res = await api.get(`/providers/admin/providers`, {
  params: options}) ;
  return res.data; 
};
export const approveProvider = async (id) => {
  const res = await api.patch(`/providers/admin/approve/${id}`) ;
  return res.data; 
};
export const disapproveProvider = async (id) => {
  const res = await api.patch(`/providers/admin/disapprove/${id}`) ;
  return res.data; 
};
export const getStates = async (options = {}) => {
  const res = await api.get(`/states/states`, {
  params: options}) ;
  return res.data; 
};
export const getProfileProvider = async (id) => {
  const res = await api.get(`/providers/${id}`) ;
  return res.data; 
};
export const createChat = async (Id_provider) => {
  const res = await api.post(`/chats/createChat/${Id_provider}`) ;
  return res.data; 
};
export const getMessages = async (chat_Id) => {
  const res = await api.get(`/messages/getMessages/${chat_Id}`) ;
  return res.data; 
};
export const sendMessage = async (chat_Id, content) => {
  const res = await api.post(`/messages/sendMessage/${chat_Id}`,{content}) ;
  return res.data; 
};
export const createRequest = async (provider_Id) => {
  const res = await api.post(`/requests/requests/${provider_Id}`) ;
  return res.data; 
};
export const cancelRequest = async (id) => {
  const res = await api.patch(`/requests/${id}/cancel`) ;
  return res.data; 
};
export const confirmRequest = async (id) => {
  const res = await api.patch(`/requests/${id}/complete`) ;
  return res.data; 
};
export const submitForm = async (Id_request, name_service, description, date) => {
  const res = await api.patch(`/requests/requests/${Id_request}`, {name_service, description, date}) ;
  return res.data; 
};
export const getRequestProvider = async (options = {}) => {
  const res = await api.get(`/requests/provider/getrequests`, {
  params: options}) ;
  return res.data; 
};
export const getRequestClient = async (options = {}) => {
  const res = await api.get(`/requests/client/getrequests`, {
  params: options}) ;
  return res.data; 
};
export const listAllFees = async (options = {}) => {
  const res = await api.get(`/fees/admin/fees`, {
  params: options}) ;
  return res.data; 
};
export const myFees = async (options = {}) => {
  const res = await api.get(`/fees/fees/me`, {
  params: options}) ;
  return res.data; 
};
export const approveFee = async (id) => {
  const res = await api.patch(`/fees/${id}/approve`) ;
  return res.data; 
};
export const disapproveFee = async (id) => {
  const res = await api.patch(`/fees/${id}/disapprove`) ;
  return res.data; 
};
export const payFee = async (id, payment_reference) => {
  const res = await api.post(`/fees/${id}/pay`, {payment_reference}) ;
  return res.data; 
};

export const verifyfee = async (id) => {
  const res = await api.get(`/fees/admin/fee/${id}`) ;
  return res.data; 
};