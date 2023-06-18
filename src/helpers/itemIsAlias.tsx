import { IngredientDict, Item } from "@/types";

export default function itemIsAlias (data: IngredientDict, item: Item) {
    const type = item.Type || '';

    if (!data.hasOwnProperty(type)) {
        return false;
    }

    for (const key of Object.keys(data[type])) {
        const aliasFound = data[type][key].find((ingredient: Item) => ingredient.AliasId === item.Id);

        if (aliasFound) {
            return true;
        }
    }

    return false;
}