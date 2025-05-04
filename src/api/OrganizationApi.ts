
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

			return response.data;
		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}
	},

	remove: async function (id: number) {
		try {
			const response = await axios.delete(`organization/remove/${id}`);

			return response;
		}
		catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}

	},

	active: async function (id: number) {
		try {
			const response = await axios.patch(`organization/active/${id}`);

			return response;
		}
		catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}

	},

	getOrgById: async function (id: number) {
		try {
			const response = await axios.get(`organization/${id}`)

			return response.data;

		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}
	},

	updateOrg: async function (id: number, data: any) {
		try {
			const response = await axios.patch(`organization/edit/${id}`, {
				data
			});

			return response.data;

		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}
	}
};