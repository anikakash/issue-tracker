import axios from "axios";

export const blogApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const githubApi = axios.create({
  baseURL: "https://api.github.com", 
});

