<script lang="ts">
	import { LANGUAGES } from "$lib/components/const";
	import { currentLocale } from "$lib/nav/stores";
	import type { Locale } from "$lib/paraglide/runtime";
	import { getLocale, setLocale } from "$lib/paraglide/runtime";
	import CustomDropdown from "./CustomDropdown.svelte";
    
    const selected: Locale = getLocale();

    const handleSelectLocale = (selected: Locale) => {
        setLocale(selected, { reload: false })
        $currentLocale = selected;
    }
</script>

<CustomDropdown list={LANGUAGES} {selected} onchange={handleSelectLocale} />