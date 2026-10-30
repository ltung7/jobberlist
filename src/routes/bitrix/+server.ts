import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from "$env/dynamic/private"
import { PUBLIC_URL } from "$env/static/public"

/**
 * Bitrix leads created via a webhook default to the webhook owner.
 * `ASSIGNED_BY_ID` overrides that and points the lead at another user.
 */
const ASSIGNED_BY_ID = 14;

const saveBitrixLead = async ({ name, phone, offerId, utm_campaign, utm_content, utm_medium, utm_source, utm_term }: BitrixLeadData) => {
    const webhookUrl = `https://${env.BITRIX_DOMAIN}/rest/1/${env.BITRIX_TOKEN}/crm.lead.add.json`;

    await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "fields": {
                "ASSIGNED_BY_ID": ASSIGNED_BY_ID,
                "TITLE": `${name} | strona`,
                "PHONE": [
                    {
                        "VALUE": phone,
                        "VALUE_TYPE": "WORK"
                    }
                ],
                "SOURCE_ID": "WEB",
                "WEB": [
                    {
                        "VALUE": `${PUBLIC_URL}/offers/${offerId}`,
                        "VALUE_TYPE": "WORK"
                    }
                ],
                "UTM_SOURCE": utm_source,
                "UTM_MEDIUM": utm_medium,
                "UTM_CAMPAIGN": utm_campaign,
                "UTM_CONTENT": utm_content,
                "UTM_TERM": utm_term
            }
        })
    })
}

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    try {
        await saveBitrixLead(data);
        return json({ success: true })
    } catch (err) {
        throw error(500, 'Server error')
    }
};