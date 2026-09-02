import { findJobberOffersList } from '$lib/server/db/firebase/jobber.fdb';
import { json } from '@sveltejs/kit';


export const GET = async ({ setHeaders }) => {
    const offers = await findJobberOffersList();
    setHeaders({
      "cache-control": "max-age=3600"
    });
    return json({ offers })
}