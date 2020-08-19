import axios from "axios";

export const BASE_URL = "https://apiv1.smkn26jkt.sch.id/";

export const schoolId = 1;

export const CLIENT_AXIOS = axios.create({
  baseURL: BASE_URL + "/api/v1",
  headers: {
    Accept: "application/json",
  },
});
