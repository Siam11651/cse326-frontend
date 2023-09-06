import { error } from '@sveltejs/kit';

export const ssr = false;

export let _serviceId: number;

/** @type {import('./$types').PageLoad} */
export function load({ params }): void
{
    _serviceId = parseInt(params.service_id);
}