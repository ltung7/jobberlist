import { m } from '$lib/paraglide/messages.js';

export const nodeMessages = {
    // Contracts
    contract_uop: m.contract_uop,
    contract_uoz: m.contract_uoz,
    contract_uod: m.contract_uod,

    // Shifts
    shift_one: m.shift_one,
    shift_two: m.shift_two,
    shift_three: m.shift_three,
    shift_agree: m.shift_agree,
    shift_flex: m.shift_flex,

    // Accommodation - short version
    accom_: m.accom_,
    accom_free: m.accom_free,
    accom_subsidized: m.accom_subsidized,
    accom_hostel: m.accom_hostel,
    accom_apartment: m.accom_apartment,
    accom_allowance: m.accom_allowance,
    accom_couples: m.accom_couples,
    accom_hotel: m.accom_hotel,
    

    // Benefits
    benefits_training: m.benefits_training,
    benefits_accommodation: m.benefits_accommodation,
    benefits_transport: m.benefits_transport,
    benefits_meals: m.benefits_meals,
    benefits_clothing: m.benefits_clothing,
    benefits_legalization: m.benefits_legalization,
    benefits_formalities: m.benefits_formalities,
    benefits_stability: m.benefits_stability,
    benefits_salary: m.benefits_salary,
    benefits_environment: m.benefits_environment,
} as const;

export type NodeKey = keyof typeof nodeMessages;

/**
 * Safely executes a dynamic Paraglide message function.
 * Falls back to returning the key if missing or invalid.
 */
export function getNodeText(key: string, args?: Record<string, any>): string {
    const messageFn = nodeMessages[key as NodeKey];
    return typeof messageFn === 'function' ? messageFn(args) : key;
}