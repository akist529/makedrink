import { IngredientDict, Item } from "@/types";

export default function itemIsAlias (data: IngredientDict, item: Item) {
    const type = item.Type || '';

    for (const key of Object.keys(data[type])) {
        const aliasFound = data[type][key].find((ingredient: Item) => ingredient.AliasId === item.Id);

        if (aliasFound) {
            return true;
        }
    }

    return false;
}