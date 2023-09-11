export const ssr = false;

export let _tenderId: number;

/** @type {import('./$types').PageLoad} */
export function load({ params }): void
{
    _tenderId = parseInt(params.tender_id);
}