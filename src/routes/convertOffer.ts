export function convertToOffer(raw: SavedOffer): Offer {
    const { rate, unit } = parseRateAndUnit(raw.rate);

    return {
        id: raw.id,
        stanowisko: raw.jobType,
        loc: parseLocation(raw.location),
        kraj: "Poland",
        rate,
        unit,
        umowa: extractFirstPart(raw.contract),
        zmiana: extractFirstPart(raw.shifts),
        dom: parseHousing(raw.housing),
        jezyk: raw.langExtra || "",
        odZaraz: new Date(raw.availableFrom) <= new Date(),
        opis: raw.workplaceDesc,
        obowiazki: parseList(raw.duties || raw.workplaceDesc),
        wymagania: parseList(raw.requirements),
        oferujemy: parseList(raw.benefits || raw.extra),
        rekruter: raw.recruiterName,
    };
}

function parseLocation(location: string): string {
    const parts = location.split(',').map((p) => p.trim()).filter(Boolean);

    if (parts.length > 0 && parts[parts.length - 1].toLowerCase() === 'poland') {
        parts.pop();
    }

    const targetPart = parts.pop() || '';
    // Remove Polish postal codes (e.g., "67-100")
    return targetPart.replace(/\b\d{2}-\d{3}\b\s*/g, '').trim();
}

function parseRateAndUnit(rateStr: string): { rate: string; unit: string } {
    // Captures optional prefix, digits (including decimals), and remaining suffix
    const match = rateStr.trim().match(/^(.*?)([\d.,]+)(.*)$/);

    if (!match) {
        return { rate: '', unit: rateStr.trim() };
    }

    const prefix = match[1].trim();
    const rate = match[2];
    const suffix = match[3].trim();

    // Combine prefix and suffix while cleaning up extra spaces
    const unit = [prefix, suffix]
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

    return { rate, unit };
}

function extractFirstPart(str: string): string {
    return str ? str.split('/')[0].trim() : '';
}

function parseHousing(housing: string): string {
    const trimmed = housing.trim();
    if (trimmed === 'Free accommodation provided by the employer.') {
        return 'Zakwaterowanie w cenie';
    }
    if (trimmed.startsWith('Employee accommodation near place of work available')) {
        return 'Możliwość zakwaterowania';
    }
    return trimmed;
}

function parseList(text: string): string[] {
    if (!text || !text.trim()) return [];

    const delimiter = text.includes('\n') ? '\n' : '.';
    return text
        .split(delimiter)
        .map((item) => item.replace(/^[\s*\-•]+/, '').trim())
        .filter((item) => item.length > 0);
}