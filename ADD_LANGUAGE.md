# Add a New Locale

You are an AI assistant tasked with adding a new language locale to this project. 
The new locale to add is: **[INSERT_2_LETTER_ISO_LANGUAGE_CODE]**

Please execute the following tasks in succession:

## 1. Update `project.inlang/settings.json`
- Read the `project.inlang/settings.json` file.
- Add the new 2-letter ISO language code to the `locales` array.
- Save the file.

## 2. Update `src/app.d.ts`
- Read the `src/app.d.ts` file.
- Find the `Lang` type definition (e.g., `type Lang = 'en' | 'pl' | ...`).
- Add the new 2-letter ISO language code to the `Lang` union type.
- Save the file.

## 3. Update `src/lib/components/const.ts`
- Read the `src/lib/components/const.ts` file.
- Locate the `LANGUAGES` record.
- Add a new key-value pair for the new language code.
- **Flag Image URL**: `https://storage.googleapis.com/feed-cdn-files/flags/[COUNTRY_CODE].svg`. Replace `[COUNTRY_CODE]` with the 2-letter ISO country code of the country that has the most speakers of this language.
- **Language Name**: The `alt`, `title`, and the text caption (outside the `<img>` tag) must be the name of the language in its own native language (e.g., "Español" for Spanish, "Deutsch" for German).
- **Format**: Follow the exact HTML structure of the existing entries:
  `'<img src="https://storage.googleapis.com/feed-cdn-files/flags/[COUNTRY_CODE].svg" alt="[Native Name]" title="[Native Name]" style="height: 21px; width: 28px;" class="flag border rounded" width="28" height="21"> [Native Name]'`
- Save the file.

## 4. Create new translations in `messages/`
- Read the base translation file at `messages/en.json`.
- Create a new file in the `messages/` directory named `[LANGUAGE_CODE].json` (e.g., `es.json`).
- Copy the structure of `en.json`.
- Translate all the string values into the new language. 
- Keep all JSON keys exactly the same.
- Keep the `"$schema"` key and value exactly the same.
- DO NOT translate placeholders enclosed in curly braces, such as `{name}`, `{count}`, `{rate}`, `{type}`. They must remain exactly as they appear in English.
- Save the new JSON file.