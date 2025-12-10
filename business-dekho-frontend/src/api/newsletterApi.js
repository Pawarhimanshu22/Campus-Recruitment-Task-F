import axiosClient from "./axiosClient";

const NEWSLETTER_BASE = "/api/newsletter";

export const getSubscriptions = () => axiosClient.get(NEWSLETTER_BASE);

export const subscribeNewsletter = (email) =>
  axiosClient.post(`${NEWSLETTER_BASE}/subscribe`, { email });

export const deleteSubscription = (id) =>
  axiosClient.delete(`${NEWSLETTER_BASE}/${id}`);
