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

/**
 *  @description : This function handles the vendor account realted actions such as creation request, deletion request, etc.
 */
const vendorReducer = (
  vendors = { unapprovedVendorList: [], vendorToDeleteList: [] },
  action
) => {
  switch (action.type) {
    case FETCH_UNAPPROVED_VENDORS:
      return { ...vendors, unapprovedVendorList: action.payload };
    case APPROVE_VENDOR_PROFILE:
      const currentUnapprovedList = [...vendors.unapprovedVendorList];
      const newUnapprovedList = currentUnapprovedList.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...vendors, unapprovedVendorList: newUnapprovedList };
    case DELETE_VENDOR_PROFILE:
      const currentVendorToDeleteList = [...vendors.vendorToDeleteList];
      const newVendorToDeleteList = currentVendorToDeleteList.filter(
        (item) => item._id !== action.payload
      );
      return { ...vendors, vendorToDeleteList: newVendorToDeleteList };
    case FETCH_VENDOR_DELETION_LIST:
      return { ...vendors, vendorToDeleteList: action.payload };
    case REQUEST_VENDOR_DELETION:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return vendors;
    case DECLINE_VENDOR_DELETION: {
      const currentVendorToDeleteList = [...vendors.vendorToDeleteList];
      const newVendorToDeleteList = currentVendorToDeleteList.filter(
        (item) => item._id !== action.payload
      );
      return { ...vendors, vendorToDeleteList: newVendorToDeleteList };
    }
    case DECLINE_VENDOR_CREATION: {
      const currentUnapprovedList = [...vendors.unapprovedVendorList];
      const newUnapprovedList = currentUnapprovedList.filter(
        (item) => item._id !== action.payload
      );
      return { ...vendors, unapprovedVendorList: newUnapprovedList };
    }
    default:
      return vendors;
  }
};

export default vendorReducer;
