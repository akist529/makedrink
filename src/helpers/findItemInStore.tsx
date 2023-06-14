import { IngredientDict, Item } from '@/types/index';

export default function findItemInStore (data: IngredientDict, itemName: string) {
    for (const type of Object.keys(data)) {
        for (const key of Object.keys(data[type])) {
            const foundItem = data[type][key].find((storedItem: Item) => (storedItem.Name === itemName));

            if (foundItem !== undefined) {
                return foundItem;
            }
        }    
    }

    return undefined;
}