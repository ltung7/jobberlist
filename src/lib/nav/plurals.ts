import { getLocale } from '$lib/paraglide/runtime.js';
import { m } from '$lib/paraglide/messages.js';

export function getOfertaCountText(count: number): string {
    const rule = new Intl.PluralRules(getLocale()).select(count);

    switch (rule) {
        case 'one':
            return m.count_oferta_one({ count });
        case 'few':
            return 'count_oferta_few' in m ? (m as any).count_oferta_few({ count }) : (m as any).count_oferta_other({ count });
        case 'many':
            return 'count_oferta_many' in m ? (m as any).count_oferta_many({ count }) : (m as any).count_oferta_other({ count });
        default:
            return m.count_oferta_other({ count });
    }
}