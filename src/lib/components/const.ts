import type { Locale } from "$lib/paraglide/runtime";

export const LANGUAGES: Record<Locale, string> = {
    en: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/en.svg" alt="English" title="English" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> English',
    pl: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/pl.svg" alt="Polski" title="Polski" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> Polski',
    hi: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/in.svg" alt="Hindi" title="Hindi" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> हिन्दी',
    ne: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/ne.svg" alt="Nepali" title="Nepali" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> नेपाली',
    uk: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/ua.svg" alt="Ukrainian" title="Ukrainian" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> Українська',
    tl: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/ph.svg" alt="Filipino" title="Filipino" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> Filipino',
    // hr: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/hr.svg" alt="Croatian" title="Croatian" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> Hrvatski',
    // be: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/by.svg" alt="Belarusian" title="Belarusian" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> Беларуская',
    // es: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/co.svg" alt="Spanish" title="Spanish" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> Español (Colombia)',
    // uz: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/uz.svg" alt="Uzbek" title="Uzbek" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> Oʻzbekcha',
    // bn: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/bd.svg" alt="Bengali" title="Bengali" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> বাংলা',
    // ka: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/ge.svg" alt="Georgian" title="Georgian" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> ქართული',
    // ro: '<img src="https://storage.googleapis.com/feed-cdn-files/flags/md.svg" alt="Romanian" title="Romanian" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> Română',
}

// Country calling codes, unique, sorted ascending.
export const countryCodes = [
	'+1', '+7', '+20', '+27', '+30', '+31', '+32', '+33',
	'+34', '+36', '+39', '+40', '+41', '+43', '+44', '+45',
	'+46', '+47', '+48', '+49', '+51', '+52', '+53', '+54',
	'+55', '+56', '+57', '+58', '+60', '+61', '+62', '+63',
	'+64', '+65', '+66', '+81', '+82', '+84', '+86', '+90',
	'+91', '+92', '+93', '+94', '+95', '+98', '+211', '+212',
	'+213', '+216', '+218', '+220', '+221', '+222', '+223', '+224',
	'+225', '+226', '+227', '+228', '+229', '+230', '+231', '+232',
	'+233', '+234', '+235', '+236', '+237', '+238', '+239', '+240',
	'+241', '+242', '+243', '+244', '+245', '+246', '+248', '+249',
	'+250', '+251', '+252', '+253', '+254', '+255', '+256', '+257',
	'+258', '+260', '+261', '+262', '+263', '+264', '+265', '+266',
	'+267', '+268', '+269', '+290', '+291', '+297', '+298', '+299',
	'+350', '+351', '+352', '+353', '+354', '+355', '+356', '+357',
	'+358', '+359', '+370', '+371', '+372', '+373', '+374', '+375',
	'+376', '+377', '+378', '+379', '+380', '+381', '+382', '+383',
	'+385', '+386', '+387', '+389', '+420', '+421', '+423', '+500',
	'+501', '+502', '+503', '+504', '+505', '+506', '+507', '+508',
	'+509', '+590', '+591', '+592', '+593', '+594', '+595', '+596',
	'+597', '+598', '+599', '+670', '+672', '+673', '+674', '+675',
	'+676', '+677', '+678', '+679', '+680', '+681', '+682', '+683',
	'+685', '+686', '+687', '+688', '+689', '+690', '+691', '+692',
	'+850', '+852', '+853', '+855', '+856', '+880', '+886', '+960',
	'+961', '+962', '+963', '+964', '+965', '+966', '+967', '+968',
	'+970', '+971', '+972', '+973', '+974', '+975', '+976', '+977',
	'+992', '+993', '+994', '+995', '+996', '+998'
];