import { getLocale, type Locale } from "$lib/paraglide/runtime";
import { writable, type Writable } from "svelte/store";

export let currentLocale: Writable<Locale> = writable(getLocale());