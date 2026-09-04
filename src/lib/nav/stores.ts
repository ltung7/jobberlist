import { getLocale, type Locale } from "$lib/paraglide/runtime";
import { writable, type Writable } from "svelte/store";

export let currentLocale: Writable<Locale> = writable(getLocale());

export let isApplyOpen: Writable<boolean> = writable(false);

export let view: Writable<'catalog' | 'detail'> = writable('catalog');
