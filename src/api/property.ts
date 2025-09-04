import { httpRequest } from "./client";
import type { PropertyCreateRequestSchema, CreatePropertyResponseSchema } from "./schemas";

export async function createProperty(payload: PropertyCreateRequestSchema, abortSignal?: AbortSignal): Promise<CreatePropertyResponseSchema> {
	return httpRequest<CreatePropertyResponseSchema, PropertyCreateRequestSchema>({
		method: "POST",
		path: "/property/",
		body: payload,
		signal: abortSignal,
	});
}


