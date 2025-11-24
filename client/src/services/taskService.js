// client/src/services/taskService.js
import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export const getTasks = () => axios.get(API);
export const addTask = (text) => axios.post(API, { text });
export const toggleTask = (id) => axios.put(`${API}/${id}`);
export const deleteTask = (id) => axios.delete(`${API}/${id}`);
export const finishDay = () => axios.post(`${API}/finish-day`);
export const getCompletedTasks = () => axios.get(`${API}/completed`);
