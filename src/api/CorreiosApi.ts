import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios;

api.defaults.baseURL = "https://viacep.com.br/ws/";

export type CEPType = {
	"cep": string;
	"logradouro": string;
	"complemento": string;
	"bairro": string;
	"localidade": string;
	"uf": string;
	"ddd": string;
};

export const correiosApi = {

	getCEP: async function (cep: string): Promise<CEPType | unknown> {
		try {
			const response: AxiosResponse = await api.get(`/${cep}/json/`);
			return response.data;
		} catch (err) {
			const error = err as AxiosError;
			return error.response?.data;
		}
	}

}