import axios from "axios";
import { setApplications, setGovernmentOfficials, setLoading, setError } from "../reducers/dashboardReducer";
import fetchData from "../../helper/apiCall";

const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const fetchStartupApplications = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data  = await fetchData("/dashboard/getStartupApplications");
    dispatch(setApplications(data));
  } catch (error) {
    dispatch(setError(error.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchGovernmentOfficials = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const  data = await fetchData("/dashboard/getGovernmentOfficials");
    dispatch(setGovernmentOfficials(data));
  } catch (error) {
    dispatch(setError(error.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const approveStartup = (startupId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log(startupId)
    await axios.post("/dashboard/approveStartup", { userId: startupId }, authHeader());
    dispatch(fetchStartupApplications());
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const rejectStartup = (startupId,rejectionReason) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.post("/dashboard/rejectStartup", { userId: startupId, rejectionReason }, authHeader());
    dispatch(fetchStartupApplications());
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const approveGovernmentOfficial = (officialId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.post("/dashboard/approveGovernmentOfficial", { userId: officialId }, authHeader());
    dispatch(fetchGovernmentOfficials());
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};