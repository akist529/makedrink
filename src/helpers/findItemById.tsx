import { IngredientDict, Item } from '@/types/index';

export default function findItemById (data: IngredientDict, id: number) {
    for (const type of Object.keys(data)) {
        for (const key of Object.keys(data[type])) {
            const foundItem = data[type][key].find((storedItem: Item) => (storedItem.Id === id));

            if (foundItem !== undefined) {
                return foundItem;
            }
        }    
    }

    return undefined;
}