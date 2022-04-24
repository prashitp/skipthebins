/**
 *   @author : Vasu Gamdha (B00902737)
 */

import {
  LOGIN,
  SIGNUP,
  EDIT_PROFILE,
  LOGOUT,
  PASSWORD_CHANGE,
} from "../../config/actionTypes";

import * as api from "../../api";
import { toast } from "react-toastify";

/**
 * @description: This function is used to get the user's profile details and creates a token for the user logged in.
 */
export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, data });
    toast.success("Logged in successfully");
    if (data?.result?.role === "normaluser") {
      navigate("/user/pickups");
    } else if (data?.result?.role === "vendor") {
      navigate("/vendor/pickups");
    } else if (data?.result?.role === "admin") {
      navigate("/profile");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

/**
 * @description: This function is used to create a user profile (normal user and vendor account).
 * It also sends an email to the user to verify the account.
 */
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: SIGNUP, data });
    toast.success(
      "Check your email inbox and spams and activate your account!"
    );
    navigate("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

/**
 * @description: This function is used to update the user's profile details.
 */
export const editProfile = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.editProfile(id, formData);
    dispatch({ type: EDIT_PROFILE, data });
    toast.success("Profile updated!");
  } catch (error) {
    toast.error("Couldn't update your profile!");
  }
};

/**
 * @description: This function is used to modify user's password.
 */
export const changePassword = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(id, formData);
    dispatch({ type: PASSWORD_CHANGE, data });
    toast.success("Password updated!");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

/**
 * @description: This function is used to delete the user's account permanently.
 * A normal user can delete their account anytime.
 * A vendor can only delete their account after admin approval.
 */
export const deleteProfile = (id, formData, navigate) => async (dispatch) => {
  try {
    formData.password = formData.passwordToDelete;
    await api.deleteProfile(id);
    dispatch({ type: LOGOUT });
    toast.success("Profile deleted!");
    navigate("/");
  } catch (error) {
    toast.error("Couldn't delete your profile!");
  }
};
