
import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios;

api.defaults.baseURL = "http://localhost:12345/";

export const eventApi = {
	insert: async function (data: any) {

		try {
			const response: AxiosResponse = await axios.post("event/", data);
			return response.data;
		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}

	},
	getAll: async function () {
		try {
			const response = await axios.get("event");
			return response.data;
		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}
	},
	getAllByFilter: async function (filters: { key: string, value: string }[]) {
		try {
			const params: { [key: string]: string } = {};

			filters.forEach(({ key, value }) => {
				params[key] = value;
			});

			const response = await axios.get("event/filters/", {
				params: params
			});

			return response.data;
		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}
	}

};