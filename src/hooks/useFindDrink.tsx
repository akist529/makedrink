import { DrinkDict, DrinkInfo } from '@/types/index';

export default function useFindDrink (data: DrinkDict, drink: DrinkInfo) {
    for (const key of Object.keys(data)) {
        return data[key].find((storedDrink: DrinkInfo) => (storedDrink.Name === drink.Name));
    }
}