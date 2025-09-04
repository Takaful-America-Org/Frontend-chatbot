import { httpRequest } from "./client";
import type { QuoteCreateRequestSchema, CreateQuoteResponseSchema } from "./schemas";

export async function createQuote(payload: QuoteCreateRequestSchema, abortSignal?: AbortSignal): Promise<CreateQuoteResponseSchema> {
	return httpRequest<CreateQuoteResponseSchema, QuoteCreateRequestSchema>({
		method: "POST",
		path: "/quote/",
		body: payload,
		signal: abortSignal,
	});
}


