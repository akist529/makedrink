import { Item, IngredientDict } from '@/types/index';

export default function allIngredientsStored (ingredients: Item[], storedIngredients: IngredientDict) {
    return ingredients.every((item: Item) => {
        if (item.Type && storedIngredients.hasOwnProperty(item.Type)) {
            for (const key of Object.keys(storedIngredients[item.Type])) {
                const storedItem = storedIngredients[item.Type][key].find((storedItem: Item) => item.Id === storedItem.Id);

                if (storedItem) {
                    return true;
                }
            }
        }
    });
}