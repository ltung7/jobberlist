import { setItem, getItemById, getItems, addItem, db, getRef } from "./firebase";

const collectionName: string = 'jobber/offers/list';

export const getJobberOffersList = async <T = SavedOffer>(id: string): Promise<T | null> => {
    return getItemById(id, collectionName);
}

export const findJobberOffersList = async <T = SavedOffer>(query: App.FirebaseItemsQuery = false, select: App.FirebaseItemsFields = false): Promise<T[]> => {
    return getItems(collectionName, query, select);
}