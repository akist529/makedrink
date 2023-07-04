import { IngredientDict, DrinkDict, Type } from '@/types/index';

export default function notNullish (storedIngredients: IngredientDict | DrinkDict | Type, key: string) {
    if (storedIngredients.hasOwnProperty(key)) {
        return true;
    } else return false;
}