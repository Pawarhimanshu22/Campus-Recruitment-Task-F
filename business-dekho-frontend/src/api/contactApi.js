// src/api/contactApi.js
import axiosClient from "./axiosClient";

const CONTACT_BASE = "/api/contacts";

export const createContact = (data) =>
  axiosClient.post(CONTACT_BASE, data);  // sends JSON body
