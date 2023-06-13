import { IngredientDict, Item, Ingredient } from '@/types/index';

export default function findAliasInStore (data: IngredientDict, item: Ingredient) {
    for (const type of Object.keys(data)) {
        for (const key of Object.keys(data[type])) {
            const aliasItem = data[type][key].find((storedItem: Item) => (storedItem.Name === item.Alias));

            if (aliasItem !== undefined) {
                return aliasItem;
            }
        }
    }

    return undefined;
}