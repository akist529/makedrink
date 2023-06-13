import { IngredientDict, Item, Ingredient } from '@/types/index';

export default function findAltInStore (data: IngredientDict, alias: Item, original: Ingredient) {
    const type = alias.Type;

    for (const key of Object.keys(data[type])) {
        const altItem = data[type][key].find((storedItem: Item) => (storedItem.AliasId === alias.Id) && (storedItem.Name !== original.Name));

        if (altItem !== undefined) {
            return altItem;
        }
    }

    return undefined;
}