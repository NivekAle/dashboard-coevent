
import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios;

api.defaults.baseURL = "http://localhost:12345/";

export const organizationApi = {
	insert: async function (data: any) {

		try {
			const response: AxiosResponse = await axios.post("organization/", data);
			return response.data;
		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}

	},
	getAll: async function () {
		try {
			const response = await axios.get("organization");
			console.log(response);

			return response.data;
		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}
	},
};