import axios from "axios";

const api = axios.create({
	baseURL: "https://chatter-backend-server.herokuapp.com",
});

export default api;
