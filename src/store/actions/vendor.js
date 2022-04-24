/**
 *   @author : Vasu Gamdha (B00902737)
 */

import {
  FETCH_UNAPPROVED_VENDORS,
  APPROVE_VENDOR_PROFILE,
  FETCH_VENDOR_DELETION_LIST,
  DELETE_VENDOR_PROFILE,
  REQUEST_VENDOR_DELETION,
  DECLINE_VENDOR_DELETION,
  DECLINE_VENDOR_CREATION,
} from "../../config/actionTypes";
import { toast } from "react-toastify";
import * as api from "../../api";

/**
 * @description: Fetches the list of all the vendors who have requested for account creation.
 */
export const getUnapprovedVendorsList = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUnapprovedVendorsList();
    dispatch({ type: FETCH_UNAPPROVED_VENDORS, payload: data });
  } catch (error) {
    toast.error("Failed to fetch unapproved vendors' account creation list!");
  }
};

/**
 * @description: Approves vendor's account creation request.
 * Allows vendor to access their account.
 */
export const approveVendorProfile = (id) => async (dispatch) => {
  try {
    const { data } = await api.approveVendorProfile(id);
    dispatch({ type: APPROVE_VENDOR_PROFILE, payload: data });
  } catch (error) {
    toast.error("Failed to create vendor account!");
  }
};

/**
 * @description: Fetches the list of all the vendors who have requested for account deletion.
 */
export const getVendorDeletionRequestList = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchVendorDeletionList();
    dispatch({ type: FETCH_VENDOR_DELETION_LIST, payload: data });
  } catch (error) {
    toast.error("Failed to fetch unapproved vendors' account deletion list!");
  }
};

/**
 * @description: Deletes the vendor account on admin approval of account deletion request.
 */
export const deleteVendorProfile = (id) => async (dispatch) => {
  try {
    await api.deleteProfile(id);
    dispatch({ type: DELETE_VENDOR_PROFILE, payload: id });
  } catch (error) {
    toast.error("Failed to delete vendor account!");
  }
};

/**
 * @description: Creates a request to delete account of a vendor
 * Admin's approval is required to delete the account.
 */
export const requestVendorDeletion = (id) => async (dispatch) => {
  try {
    const { data } = await api.requestVendorDeletion(id);
    dispatch({ type: REQUEST_VENDOR_DELETION, payload: data });
  } catch (error) {
    toast.error("Failed request account deletion!");
  }
};

/**
 * @description: Declines vendor's account creation request.
 * Vendor account will not be created.
 */
export const declineVendorProfileCreation = (id) => async (dispatch) => {
  try {
    await api.declineVendorProfileCreation(id);
    dispatch({ type: DECLINE_VENDOR_CREATION, payload: id });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description: Declines vendor's account deletion request.
 * Vendor account will not be deleted.
 */
export const declineVendorProfileDeletion = (id) => async (dispatch) => {
  try {
    const { data } = await api.declineVendorProfileDeletion(id);
    dispatch({ type: DECLINE_VENDOR_DELETION, payload: data });
  } catch (error) {
    console.log(error);
  }
};
