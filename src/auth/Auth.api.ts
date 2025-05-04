import axios from "axios";

const auth_api = axios.create({
	baseURL: "http://localhost:12345/",
});

auth_api.interceptors.request.use(config => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});


export default auth_api;
