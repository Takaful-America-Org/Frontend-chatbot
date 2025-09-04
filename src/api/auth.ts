import { httpRequest } from "./client";
import type { RegisterUserRequestSchema, RegisterUserResponseSchema } from "./schemas";

export async function registerUser(payload: RegisterUserRequestSchema, abortSignal?: AbortSignal): Promise<RegisterUserResponseSchema> {
	return httpRequest<RegisterUserResponseSchema, RegisterUserRequestSchema>({
		method: "POST",
		path: "/auth/register",
		body: payload,
		signal: abortSignal,
	});
}


