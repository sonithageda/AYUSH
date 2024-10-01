import axios from "axios";
import { setStartups, setStartupDetails, setLoading, setError } from "../reducers/startupReducer";
import fetchData from "../../helper/apiCall";

const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const fetchApprovedStartups = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await fetchData("/startup/");
    dispatch(setStartups(data));
  } catch (error) {
    dispatch(setError(error.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchStartupDashboard = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await fetchData("/api/startups/dashboard");
    dispatch(setStartupDetails(data));
  } catch (error) {
    dispatch(setError(error.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateStartupProfile = (profileData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.put("/api/startups/update-profile", profileData, authHeader());
    dispatch(setStartupDetails(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const uploadDocument = (document) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append('document', document);
    const { data } = await axios.post("/api/startups/upload-document", formData, {
      ...authHeader(),
      'Content-Type': 'multipart/form-data'
    });
    dispatch(setStartupDetails(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "An error occurred"));
  } finally {
    dispatch(setLoading(false));
  }
};