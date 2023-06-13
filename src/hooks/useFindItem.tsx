import { IngredientDict, Item } from '@/types/index';

export default function useFindItem (data: IngredientDict, name: string) {
    if (data.hasOwnProperty('Type')) {
        for (const type of Object.keys(data)) {
            for (const key of Object.keys(data[type])) {
                return data[type][key].find((storedItem: Item) => (storedItem.Name === name));
            }    
        }
    }
}