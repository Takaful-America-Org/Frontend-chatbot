/* Axios-based HTTP client with request/response interceptors */

import axios from "axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig<TBody = unknown> {
	method?: HttpMethod;
	path: string;
	body?: TBody;
	headers?: Record<string, string>;
	signal?: AbortSignal;
}

// Prefer Vite dev proxy at /api in development to avoid CORS; use env base URL otherwise
const baseUrl: string = (import.meta as any).env?.DEV ? 
    "/api" : 
    ((import.meta as any).env?.VITE_API_BASE_URL || "/api");

const api = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor: attach auth header or other common headers here
api.interceptors.request.use((config: any) => {
	// Example: attach bearer token if set via setDefaultHeader
	if (defaultHeaders.Authorization) {
		config.headers = config.headers ?? {};
		(config.headers as Record<string, string>)["Authorization"] = defaultHeaders.Authorization as string;
	}
	return config;
});

// Response interceptor: normalize errors
api.interceptors.response.use(
	(response: any) => response,
	(error: any) => {
		if (error.response) {
			const status = error.response.status as number;
			const data = error.response.data as unknown;
			const message = `HTTP ${status}`;
			return Promise.reject(new HttpError(message, status, data));
		}
		return Promise.reject(error);
	}
);

const defaultHeaders: Record<string, string> = {};

export async function httpRequest<TResponse, TBody = unknown>(config: RequestConfig<TBody>): Promise<TResponse> {
	const { method = "GET", path, body, headers, signal } = config;
	const axiosConfig: any = {
		method,
		url: path,
		data: body,
		headers: { ...(headers || {}) },
		signal,
	};
	const resp = await api.request<TResponse>(axiosConfig as any);
	return resp.data;
}

export class HttpError extends Error {
	public readonly status: number;
	public readonly data: unknown;

	constructor(message: string, status: number, data: unknown) {
		super(message);
		this.status = status;
		this.data = data;
	}
}

export function setDefaultHeader(key: string, value: string | undefined) {
	if (value == null) {
		delete defaultHeaders[key];
		return;
	}
	defaultHeaders[key] = value;
}


