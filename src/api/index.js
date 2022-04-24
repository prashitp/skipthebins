/**
 *   @author : Vasu Gamdha (B00902737)
 */

import axios from "axios";

import * as Constants from "../constants";

const API = axios.create({ baseURL: Constants.WEB_API_URL });

/**
 * @description: Interceptor to pass the bearer token in the header
 */
API.interceptors.request.use((req) => {
  var token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post("/profile/login", formData);
export const signup = (formData) => API.post("/profile/signup", formData);
export const editProfile = (id, formData) =>
  API.patch(`/profile/${id}/editProfile`, formData);
export const changePassword = (id, formData) =>
  API.patch(`/profile/${id}/changePassword`, formData);
export const deleteProfile = (id) => API.delete(`/profile/${id}/deleteProfile`);
export const fetchUnapprovedVendorsList = () =>
  API.get("/adminActions/unapprovedList");
export const approveVendorProfile = (id) =>
  API.patch(`/adminActions/${id}/approveVendorProfile`);
export const fetchVendorDeletionList = (id) =>
  API.get("/adminActions/deletionList");
export const requestVendorDeletion = (id) =>
  API.delete(`/adminActions/${id}/requestDeletion`);
export const declineVendorProfileCreation = (id) =>
  API.delete(`/adminActions/${id}/declineVendorCreation`);
export const declineVendorProfileDeletion = (id) =>
  API.patch(`/adminActions/${id}/declineVendorDeletion`);

export default API;
