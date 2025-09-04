// Auto-derived TypeScript interfaces from provided OpenAPI schema

export type ConstructionMaterials = "frame" | "masonry" | "steel" | "concrete" | "other";
export type FoundationTypes = "slab" | "basement" | "crawl_space" | "pier_beam";
export type PropertyTypes = "single_family" | "townhouse" | "condo";
export type RoofTypes = "composition_shingle" | "metal" | "tile" | "slate" | "other";
export type QuoteStatus = "draft" | "generated" | "delivered" | "expired" | "converted";
export type RiskTier = "preferred" | "standard" | "substandard" | "declined";

export interface RegisterUserRequestSchema {
	email: string; // email
	first_name: string;
	last_name: string;
	phone_number: string;
}

export interface RegisterUserResponseSchema {
	message?: string; // default: "User registered successfully"
	user_id: string; // uuid
	keycloak_user_id: string; // uuid
}

export interface PropertyCreateRequestSchema {
	user_id: string; // uuid
	street_address: string;
	city: string;
	state: string;
	zip_code: string;
	property_type?: PropertyTypes; // default single_family
	construction_year: number;
	home_value: number;
	square_footage: number;
	construction_material?: ConstructionMaterials; // default frame
	roof_type?: RoofTypes; // default composition_shingle
	foundation_type?: FoundationTypes; // default slab
	stories?: number | null; // default 1
	bedrooms?: number | null;
	bathrooms?: number | null;
	garage?: boolean | null; // default false
	pool?: boolean | null; // default false
	latitude?: number | string | null;
	longitude?: number | string | null;
	flood_zone?: string | null;
	fire_protection_class?: number | null;
}

export interface PropertyResponseSchema {
	property_id: string;
	user_id: string;
	street_address: string;
	city: string;
	state: string;
	property_type: PropertyTypes;
	zip_code: string;
	construction_year: number;
	home_value: number;
	square_footage: number;
	construction_material: ConstructionMaterials;
	roof_type: RoofTypes;
	foundation_type: FoundationTypes;
	stories?: number | null;
	bedrooms?: number | null;
	bathrooms?: number | null;
	garage?: boolean | null;
	pool?: boolean | null;
	risk_score?: number | null;
	risk_tier?: RiskTier | null;
	latitude?: string | null;
	longitude?: string | null;
	flood_zone?: string | null;
	fire_protection_class?: number | null;
	created_at?: string | null; // date-time
	updated_at?: string | null; // date-time
}

export interface CreatePropertyResponseSchema {
	message?: string; // default: "Property created successfully"
	property: PropertyResponseSchema;
}

export interface QuoteCreateRequestSchema {
	property_id: string; // uuid
	user_id: string; // uuid
	dwelling_limit: number;
	deductible: number;
	safety_discount?: number | string | null; // default "0.0"
	status?: QuoteStatus | null; // default "draft"
}

export interface QuoteResponseSchema {
	quote_id: string;
	property_id: string;
	user_id: string;
	status: QuoteStatus;
	created_at?: string | null;
	updated_at?: string | null;
}

export interface QuoteVersionResponseSchema {
	version_id: string;
	quote_id: string;
	version: number;
	base_premium: string;
	taxes_and_fees: string;
	total_premium: string;
	dwelling_limit: number;
	deductible: number;
	safety_discount?: string | null;
	calculated_premium?: string | null;
	subtotal?: string | null;
	discounts?: string[] | null;
	multipliers_applied?: Record<string, unknown> | null;
	created_at?: string | null;
	updated_at?: string | null;
}

export interface CreateQuoteResponseSchema {
	message?: string; // default: "Quote created successfully"
	quote: QuoteResponseSchema;
	quote_version: QuoteVersionResponseSchema;
	quote_id: string; // uuid
	version_id: string; // uuid
	total_premium: string;
}

export interface HTTPValidationError {
	detail?: ValidationError[];
}

export interface ValidationError {
	loc: Array<string | number>;
	msg: string;
	type: string;
}


