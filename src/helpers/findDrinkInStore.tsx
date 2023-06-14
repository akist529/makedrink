import { DrinkDict, DrinkInfo } from '@/types/index';

export default function findDrinkInStore (data: DrinkDict, drinkName: string) {
    for (const key of Object.keys(data)) {
        const foundDrink = data[key].find((storedDrink: DrinkInfo) => (storedDrink.Name === drinkName));

        if (foundDrink !== undefined) {
            return foundDrink;
        }
    }

    return undefined;
}