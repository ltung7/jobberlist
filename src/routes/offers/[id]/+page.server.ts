import { getJobberOffersList } from '$lib/server/db/firebase/jobber.fdb';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const offer = await getJobberOffersList(params.id);
    if (!offer) throw error(404, 'Invalid offer')
    return { offer };
}) satisfies PageServerLoad;