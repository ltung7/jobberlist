import { addJobberOffersList, deleteJobberOfferList, findJobberOffersList, getJobberOffersList, setJobberOffersList } from '$lib/server/db/firebase/jobber.fdb';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import saveJson from '$lib/utils/saveJson';

const offers = [
  {
    id:"prod-wroclaw", stanowisko:"Pracownik produkcji", loc:"Wrocław", kraj:"Polska",
    rate:"28,10", unit:"zł / h brutto", umowa:"Umowa zlecenie", zmiana:"System 3-zmianowy",
    dom:"Zakwaterowanie w cenie", jezyk:"PL / UA", odZaraz:true,
    opis:"Praca przy liniach produkcyjnych nowoczesnego zakładu AGD. Montaż i kontrola jakości podzespołów. Nie wymagamy doświadczenia — wdrożenie i szkolenie stanowiskowe zapewnia pracodawca.",
    obowiazki:["Montaż elementów na linii produkcyjnej","Kontrola wizualna jakości","Pakowanie gotowych wyrobów","Utrzymanie porządku na stanowisku"],
    wymagania:["Chęć do pracy i dyspozycyjność","Gotowość do pracy zmianowej","Nie wymagamy doświadczenia","Podstawowa komunikatywność (PL lub UA)"],
    oferujemy:["Stawka 28,10 zł/h brutto + premie","Bezpłatne zakwaterowanie","Dowóz do zakładu","Wypłata co tydzień na życzenie","Pakiet socjalny i odzież robocza"],
    rekruter:"Anna Kowalczyk"
  },
  {
    id:"mag-poznan", 
    stanowisko:"Magazynier / Operator skanera", 
    loc:"Poznań", 
    kraj:"Polska",
    rate:"27,00",
    unit:"zł / h brutto", 
    umowa:"Umowa o pracę", 
    zmiana:"System 2-zmianowy",
    dom:"Dojazd zapewniony", 
    jezyk:"PL", 
    odZaraz:true,
    opis:"Obsługa magazynu e-commerce: kompletacja zamówień ze skanerem, przyjęcia i wydania towaru. Jasne cele dzienne, przyjazna atmosfera zespołu.",
    obowiazki:["Kompletacja zamówień wg skanera","Przyjmowanie i sortowanie towaru","Kontrola ilościowa","Praca zgodnie z procedurami BHP"],
    wymagania:["Dobra organizacja pracy","Dokładność i tempo","Mile widziane doświadczenie w magazynie","Aktualna książeczka sanepid nie jest wymagana"],
    oferujemy:["Umowa o pracę od pierwszego dnia","Dojazd autobusem firmowym","Premie frekwencyjne","Zniżki pracownicze","Możliwość stałego zatrudnienia"],
    rekruter:"Piotr Zieliński"
  },
  {
    id:"wozek-lodz", stanowisko:"Operator wózka widłowego", loc:"Łódź", kraj:"Polska",
    rate:"30,50", unit:"zł / h brutto", umowa:"Umowa zlecenie", zmiana:"Zmiana dzienna",
    dom:"Zakwaterowanie w cenie", jezyk:"PL / UA", odZaraz:true,
    opis:"Operowanie wózkiem widłowym (czołowy / wysokiego składowania) w centrum logistycznym. Wymagane aktualne uprawnienia UDT.",
    obowiazki:["Rozładunek i załadunek towaru","Transport wewnętrzny palet","Składowanie wysokie","Bieżąca kontrola stanu wózka"],
    wymagania:["Aktualne uprawnienia UDT na wózki","Doświadczenie min. 6 miesięcy","Odpowiedzialność","Gotowość do pracy od zaraz"],
    oferujemy:["Wysoka stawka 30,50 zł/h","Bezpłatne zakwaterowanie","Nadgodziny płatne dodatkowo","Stała, długoterminowa współpraca"],
    rekruter:"Anna Kowalczyk"
  },
  {
    id:"pak-gniezno", stanowisko:"Pakowacz / Pakowaczka", loc:"Gniezno", kraj:"Polska",
    rate:"26,80", unit:"zł / h brutto", umowa:"Umowa zlecenie", zmiana:"System 2-zmianowy",
    dom:"Zakwaterowanie w cenie", jezyk:"PL / UA", odZaraz:true,
    opis:"Lekka praca przy pakowaniu i etykietowaniu produktów spożywczych. Idealne na start — proste zadania, szybkie wdrożenie, praca w zespole.",
    obowiazki:["Pakowanie produktów do opakowań zbiorczych","Etykietowanie i ważenie","Układanie na paletach","Dbanie o czystość stanowiska"],
    wymagania:["Chęć do pracy","Bez przeciwwskazań do pracy stojącej","Nie wymagamy doświadczenia","PL lub UA komunikatywnie"],
    oferujemy:["Stawka 26,80 zł/h brutto","Bezpłatne zakwaterowanie","Praca dla par i grup znajomych","Zaliczki tygodniowe"],
    rekruter:"Marta Nowak"
  },
  {
    id:"mag-berlin", stanowisko:"Pracownik magazynu", loc:"Berlin", kraj:"Niemcy",
    rate:"14,50", unit:"€ / h", umowa:"Umowa niemiecka", zmiana:"System 2-zmianowy",
    dom:"Zakwaterowanie + dojazd", jezyk:"PL / UA / EN", odZaraz:true,
    opis:"Praca w dużym centrum dystrybucyjnym pod Berlinem. Legalne zatrudnienie na umowie niemieckiej, pełne ubezpieczenie, opieka koordynatora mówiącego po polsku.",
    obowiazki:["Kompletacja i sortowanie przesyłek","Skanowanie towaru","Załadunek","Praca zgodnie z normami niemieckimi"],
    wymagania:["Aktualny paszport lub dowód (UE)","Gotowość do wyjazdu","Nie wymagamy języka niemieckiego","Doświadczenie mile widziane"],
    oferujemy:["Stawka 14,50 €/h + dodatki","Zakwaterowanie zorganizowane","Dojazd do pracy","Umowa niemiecka i ubezpieczenie","Polskojęzyczny koordynator na miejscu"],
    rekruter:"Piotr Zieliński"
  },
  {
    id:"spawacz-katowice", stanowisko:"Spawacz MAG (135)", loc:"Katowice", kraj:"Polska",
    rate:"od 35,00", unit:"zł / h brutto", umowa:"Umowa o pracę", zmiana:"Zmiana dzienna",
    dom:"Dojazd zapewniony", jezyk:"PL", odZaraz:true,
    opis:"Spawanie konstrukcji stalowych metodą MAG (135) w zakładzie produkcyjnym. Stawka uzależniona od doświadczenia i jakości spawów — dla dobrych fachowców powyżej 35 zł/h.",
    obowiazki:["Spawanie metodą MAG (135)","Czytanie rysunku technicznego","Przygotowanie elementów do spawania","Kontrola jakości własnej pracy"],
    wymagania:["Aktualne uprawnienia spawalnicze MAG","Doświadczenie min. 1 rok","Umiejętność czytania rysunku","Dokładność i samodzielność"],
    oferujemy:["Stawka od 35 zł/h — do uzgodnienia","Umowa o pracę","Dojazd zorganizowany","Premie za jakość","Stabilne zatrudnienie"],
    rekruter:"Marta Nowak"
  }
];


export const GET = async () => {
    const offers = await findJobberOffersList();
    // await saveJson(offers);
    return json({ offers })
}

// export const POST = async ({ request }: RequestEvent) => {
//     const { id: existingId, ...data } = await request.json();
//     if (existingId?.length) {
//         await setJobberOffersList(existingId, data);
//         return json({ id: existingId, success: true })
//     }
    
//     const id = await addJobberOffersList(data)
//     return json({ id, success: true })
// }

// export const PATCH = async ({ request }: RequestEvent) => {
//     const { id, ...data } = await request.json();
//     if (!id) throw error(400, 'Invalid request')
//     await setJobberOffersList(id, data);
//     return json({ id, success: true })
// }

// export const DELETE = async ({ url }: RequestEvent) => {
//     const id = url.searchParams.get('id')
//     if (!id?.length) throw error(400, 'Invalid request')
//     const item = await getJobberOffersList(id)
//     if (!item) throw error(400, 'Item not found');

//     await deleteJobberOfferList(item);
//     return json({ id, success: true })
// }
